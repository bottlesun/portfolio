import { isEmpty } from "class-validator";
import { NextFunction, Request, Response, Router } from "express";
import * as fs from "fs";
import { unlinkSync } from "fs";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import { AppDataSource } from "../data-source";
import Post from "../entity/Post";
import Sub from "../entity/Sub";
import { User } from "../entity/User";
import authMiddleware from "../middlewares/auth";
import userMiddleware from "../middlewares/user";
import { makeId } from "../utils/helpers";

const getSub = async (req: Request, res: Response) => {
  const name = req.params.name;
  try {
    const sub = await Sub.findOneByOrFail({ name });

    // 포스트 생성 후 해당 sub에 속하는 포스트 정보들을 넣어준다
    const posts = await Post.find({
      where: { subName: sub.name }, // 해당 sub에 속하는 포스트들을 가져온다
      order: { createdAt: "DESC" }, // 최신순으로 정렬
      relations: ["comments", "votes"] // 포스트에 속하는 댓글과 투표 정보를 가져온다
      // relations 는 해당 엔티티와 관계가 있는 엔티티를 가져온다.
    });

    sub.posts = posts;

    if (res.locals.user) {
      // 유저가 투표한 포스트들을 넣어준다
      sub.posts.forEach((p) => p.setUserVote(res.locals.user));
    }

    return res.json(sub);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "커뮤니티를 찾을 수 없습니다." });
  }
};
const createSub = async (req: Request, res: Response, next) => {
  const { name, title, description } = req.body;

  // 유저 정보가 있다면 sub 이름과 제목이 있는지 체크
  try {
    let error: Error | any = {};
    //isEmpty()는 class-validator 에서 제공하는 함수로, 해당 값이 비어있는지 확인해준다.
    if (isEmpty(name)) error.name = "이름은 비워둘 수 없습니다.";
    if (isEmpty(title)) error.title = "제목은 비워둘 수 없습니다.";

    // sub는 이미 존재하는지 확인
    // await AppDataSource 에서 getRepository()를 통해 Sub 를 가져온다.
    // createQueryBuilder()를 통해 sub 테이블을 가져온다.
    // where()를 통해 sub 테이블의 name 컬럼이 name 과 일치하는지 확인한다.
    // getOne()을 통해 하나의 데이터만 가져온다.
    const sub = await AppDataSource.getRepository(Sub).createQueryBuilder("sub").where("lower(sub.name) = :name", { name: name.toLowerCase() }).getOne();

    if (sub) error.name = "서브가 이미 존재합니다.";
    if (Object.keys(error).length > 0) throw error;
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "문제가 발생했습니다." });
  }

  // 유저 정보가 있다면 sub 를 생성
  try {
    const user: User = res.locals.user;
    // Sub Instance 생성 후 데이터베이스에 저장
    const sub = new Sub();
    sub.name = name;
    sub.title = title;
    sub.description = description;
    sub.user = user;

    await sub.save();

    // 저장한 정보 프론트엔드로 전달
    return res.json(sub);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "문제가 발생했습니다." });
  }
};
const topSubs = async (req: Request, res: Response) => {
  try {
    // 이미지 경로를 가져오는데 ${process.env.APP_URL}/images/ 를 붙여 가져온다.
    const imageUrlExp = `COALESCE('${process.env.APP_URL}/images/'|| s."imageUrn", 'https://www.gravatar.com/avatar?d=mp&f=y')`;
    const subs = await AppDataSource.createQueryBuilder()
      .select(`s.title, s.name, ${imageUrlExp} as "imageUrl", count(p.id) as "postCount"`)
      // count(p.id) as "postCount" 는 p.id 의 갯수를 postCount 로 가져온다.
      .from(Sub, "s") // Sub 테이블을 가져온다.
      .leftJoin(Post, "p", `s.name = p."subName"`) //   Post 테이블을 가져온다.
      .groupBy('s.title, s.name, "imageUrl"') // s.title, s.name, "imageUrl" 의 그룹을 가져온다.
      .orderBy(`"postCount"`, "DESC") // postCount 를 기준으로 내림차순 정렬
      .limit(5) // 5개만 가져온다.
      .execute(); // 실행

    return res.json(subs);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "문제가 발생했습니다." });
  }
};

const ownSub = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;

  try {
    const sub = await Sub.findOneOrFail({ where: { name: req.params.name } });

    if (sub.username !== user.username) {
      return res.status(403).json({ error: "이 커뮤니티를 소유하고 있지 않습니다." });
    }

    res.locals.sub = sub;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "문제가 발생했습니다." });
  }
};

const upload = multer({
  storage: multer.diskStorage({
    destination: "public/images",
    filename: (_, file, callback) => {
      const name = makeId(15);
      // path.extname()은 파일의 확장자를 가져온다.
      // file.originalname 은 파일의 원래 이름을 가져온다.
      // callback 은 multer 에서 제공하는 함수로, 첫번째 인자는 에러, 두번째 인자는 파일 이름을 가져온다.
      // 파일 이름은 name + 확장자로 설정한다.
      // ex) 123456789012345.png
      callback(null, name + path.extname(file.originalname));
    }
  }),
  fileFilter: (_, file: any, callback: FileFilterCallback) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
      callback(null, true);
    } else {
      callback(new Error("이미지 파일만 업로드 할 수 있습니다."));
    }
  }
});

const uploadSubImage = async (req: Request, res: Response) => {
  const sub: Sub = res.locals.sub;

  try {
    const type = req.body.type;
    // 파일 유형을 지정치 않았을 시에는 업로드 된 파일을 삭제
    if (type !== "image" && type !== "banner") {
      if (!req.file?.path) return res.status(400).json({ error: "유효하지 않은 파일" });

      // 파일을 지워주기
      unlinkSync(req.file.path);
      return res.status(400).json({ error: "잘못 된 유형" });
    }

    let olbImageUrn: string = "";
    if (type === "image") {
      // 사용중인 Urn 저장합니다. (이전 파일을 아래서 삭제하기 위해)
      olbImageUrn = sub.imageUrn || "";
      // 새로운 파일 이름을 Urn 으로 넣어준다.
      sub.imageUrn = req.file?.filename || "";
    } else if (type === "banner") {
      olbImageUrn = sub.bannerUrn || "";
      sub.bannerUrn = req.file?.filename || "";
    }
    await sub.save();

    // 사용하지 않는 이미지 파일 삭제
    if (olbImageUrn !== "") {
      const fullFilename = path.resolve(process.cwd(), "public", "images", olbImageUrn);
      fs.unlinkSync(fullFilename);
    }

    return res.json(sub);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "문제가 발생했습니다." });
  }
};

const router = Router();

// 미들웨어 연결
router.get("/:name", userMiddleware, getSub);
router.post("/", userMiddleware, authMiddleware, createSub);
router.get("/sub/topSubs", topSubs);
router.post("/:name/upload", userMiddleware, authMiddleware, ownSub, upload.single("file"), uploadSubImage);

export default router;
