import { Request, Response, Router } from "express";
import Comment from "../entity/Comment";
import Post from "../entity/Post";
import { User } from "../entity/User";
import Vote from "../entity/Vote";
import authMiddleware from "../middlewares/auth";
import userMiddleware from "../middlewares/user";

const vote = async (req: Request, res: Response) => {
  const { identifier, slug, commentIdentifier, value } = req.body;

  // -1 0 1 의 value 만 받아오는지 체크
  if (![-1, 0, 1].includes(value)) {
    return res.status(400).json({ value: "-1 0 1 의 value 의 값만 올 수 있습니다." });
  }

  try {
    const user: User = res.locals.user;
    let post: Post | undefined = await Post.findOneByOrFail({ identifier, slug });
    let vote: Vote | undefined;
    let comment: Comment | undefined;

    if (commentIdentifier) {
      // 댓글 식별자가 있는 경우 댓글로 vote 찾기
      comment = await Comment.findOneByOrFail({ identifier: commentIdentifier });
      vote = await Vote.findOneBy({ username: user.username, commentId: comment.id });
    } else {
      // 댓글 식별자가 없는 경우 포스트로 vote 찾기
      vote = await Vote.findOneBy({ username: user.username, postId: post.id });
    }

    if (!vote && value === 0) {
      // vote 가 없고 value 가 0 인 경우 에러 발생
      return res.status(404).json({ error: "투표를 찾을 수 없습니다." });
    } else if (!vote) {
      // vote 가 없는 경우
      vote = new Vote();
      vote.user = user;
      vote.value = value;

      // 게시물에 속한 vote 인지 댓글에 속한 vote 인지 확인
      if (comment) vote.comment = comment;
      else vote.post = post;

      await vote.save();
    } else if (value === 0) {
      // vote 가 있는 경우 value 가 0 인 경우
      await vote.remove();
    } else if (vote.value !== value) {
      // vote 가 있는 경우 vote 의 value 와 value 가 다른 경우
      vote.value = value;
      await vote.save();
    }

    post = await Post.findOneOrFail({
      where: { identifier, slug },
      relations: ["comments", "comments.votes", "sub", "votes"]
    });

    post.setUserVote(user);
    post.comments.forEach((c) => c.setUserVote(user));

    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "문제가 발생했습니다." });
  }
};

const router = Router();

router.post("/", userMiddleware, authMiddleware, vote);

export default router;
