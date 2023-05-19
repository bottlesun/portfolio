import { Request, Response, Router } from "express";
import Post from "../entity/Post";
import Sub from "../entity/Sub";
import authMiddleware from "../middlewares/auth";
import userMiddleware from "../middlewares/user";

const createPost = async (req: Request, res: Response) => {
  const { title, body, sub } = req.body;
  if (title.trim() === "") {
    return res.status(400).json({ title: "제목을 입력해주세요." });
  }

  const user = res.locals.user; // user 정보를 가져온다.

  try {
    const subRecord = await Sub.findOneByOrFail({ name: sub });
    const post = new Post(); // Post Instance 생성 후 데이터베이스에 저장
    post.title = title;
    post.body = body;
    post.sub = subRecord;
    post.user = user;

    await post.save();

    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "문제가 발생했습니다." });
  }
};

const getPost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;

  try {
    const post = await Post.findOneOrFail({
      where: { identifier, slug },
      relations: ["sub", "votes"]
    });

    if (res.locals.user) {
      post.setUserVote(res.locals.user);
    }

    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "포스트를 찾을 수 없습니다." });
  }
};

const router = Router();

// 미들웨어 연결
router.get(":identifier/:slug", userMiddleware, authMiddleware, getPost);
router.post("/", userMiddleware, authMiddleware, createPost);
export default router;
