import { Request, Response, Router } from "express";
import Comment from "../entity/Comment";
import Post from "../entity/Post";
import { User } from "../entity/User";
import userMiddleware from "../middlewares/user";

const getUserData = async (req: Request, res: Response) => {
  try {
    // 유저 정보 가져오기
    const user = await User.findOneOrFail({
      where: { username: req.params.username },
      select: ["username", "createdAt"]
    });

    // 유저가 쓴 포스트 정보 가져오기
    const posts = await Post.find({
      where: { username: user.username },
      relations: ["comments", "votes", "sub"]
    });

    // 유저가 쓴 댓글 정보 가져오기
    const comments = await Comment.find({
      where: { username: user.username },
      relations: ["post"]
    });

    if (res.locals.user) {
      const { user } = res.locals;
      posts.forEach((p) => p.setUserVote(user));
      comments.forEach((c) => c.setUserVote(user));
    }

    let userData: any[] = [];

    // to.JSON() 메소드를 사용하면 spread operator 를 이용해 새로운 객체로 복사를 할 때, 인스턴스 상태로 하면
    // @Expose 를 이용한 getter 는 들어가지 않기에 객체로 바꾼 후 복사 해준다.
    posts.forEach((p) => userData.push({ type: "Post", ...p.toJSON() }));
    comments.forEach((c) => userData.push({ type: "Comment", ...c.toJSON() }));

    // 최신정보가 먼저 오게 순서 정렬
    userData.sort((a, b) => {
      if (a.createdAt > b.createdAt) return -1;
      if (a.createdAt < b.createdAt) return 1;
      return 0;
    });

    return res.json({ user, userData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "문제가 발생했습니다." });
  }
};

const router = Router();

router.get("/:username", userMiddleware, getUserData);

export default router;
