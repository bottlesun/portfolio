import { Request, Response, Router } from "express";
import Comment from "../entity/Comment";
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
      where: { identifier, slug }, // 해당 sub에 속하는 포스트들을 가져온다
      relations: ["sub", "votes"] // 포스트에 속하는 댓글과 투표 정보를 가져온다
    });

    if (res.locals.user) {
      post.setUserVote(res.locals.user); // 유저가 투표한 포스트들을 넣어준다
    }

    return res.send(post); // 포스트 정보를 보내준다
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "게시물을 찾을 수 없습니다." });
  }
};

const createPostComments = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  const body = req.body.body;

  try {
    const post = await Post.findOneByOrFail({ identifier, slug }); // 해당 sub에 속하는 포스트들을 가져온다
    const comment = new Comment(); // Comment Instance 생성 후 데이터베이스에 저장
    comment.body = body; // 댓글 내용을 저장한다
    comment.user = res.locals.user; // 댓글 작성자 정보를 저장한다
    comment.post = post; // 댓글이 속한 포스트 정보를 저장한다

    if (res.locals.user) {
      post.setUserVote(res.locals.user); // 유저가 투표한 포스트들을 넣어준다
    }

    await comment.save(); // 댓글을 저장한다

    return res.json(comment); // 댓글 정보를 보내준다
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "게시물을 찾을 수 없습니다." });
  }
};

const getPostComments = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  try {
    const post = await Post.findOneByOrFail({ identifier, slug });
    const comments = await Comment.find({
      where: { postId: post.id },
      order: { createdAt: "DESC" },
      relations: ["votes"]
    });
    if (res.locals.user) {
      comments.forEach((c) => c.setUserVote(res.locals.user)); // 유저가 투표한 댓글들을 넣어준다
    }
    return res.json(comments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "문제가 발생했습니다." });
  }
};

const getPosts = async (req: Request, res: Response) => {
  const currentPage: number = (req.query.page || 0) as number; // 현재 페이지
  const perPage: number = (req.query.count || 8) as number; // 한 페이지에 보여줄 포스트 개수

  try {
    const posts = await Post.find({
      order: { createdAt: "DESC" }, // DESC: 내림차순, ASC: 오름차순
      relations: ["comments", "votes", "sub"], // 포스트에 속하는 댓글과 투표 정보를 가져온다
      skip: currentPage * perPage, // 현재 페이지 * 한 페이지에 보여줄 포스트 개수
      take: perPage // 한 페이지에 보여줄 포스트 개수
    });

    if (res.locals.user) {
      posts.forEach((p) => p.setUserVote(res.locals.user)); // 유저가 투표한 포스트들을 넣어준다
    }

    return res.json(posts); // 포스트 정보를 프론트로 보내준다
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "문제가 발생했습니다." });
  }
};

const router = Router();

// 미들웨어 연결
router.get("/:identifier/:slug", userMiddleware, getPost);
router.post("/", userMiddleware, authMiddleware, createPost);

router.get("/:identifier/:slug/comments", userMiddleware, getPostComments);
router.post("/:identifier/:slug/comments", userMiddleware, createPostComments);

router.get("/", userMiddleware, getPosts);
export default router;
