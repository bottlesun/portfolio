import axios from "axios";
import { useRouter } from "next/router";
import { SWRResponse } from "swr/_internal";
import { Comment, Post } from "../../../../types/user";
import VoteView from "./vote.view";

export type VoteProps = {
  post: Post;
  comment?: Comment;
  authenticated?: boolean;
  mutate?: SWRResponse<Post[] | Comment[]>["mutate"];
  vote?: (value: number) => void;
};
const Vote = ({ post, authenticated, comment, mutate, vote }: VoteProps) => {
  const router = useRouter();
  const onVote = async (value: number, comment?: Comment) => {
    if (!authenticated) return router.push("/login");
    // 이미 클릭한 vote 버튼을 눌렀을 시에는 reset
    if ((!comment && value === post.userVote) || (comment && value === comment.userVote)) value = 0;

    try {
      await axios.post("/votes", {
        identifier: post.identifier,
        slug: post.slug,
        commentIdentifier: comment?.identifier,
        value: value
      });
      if (mutate) await mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const props = {
    data: comment ? comment : post,
    onVoteValue: comment ? comment : undefined,
    onVote: vote ? vote : onVote
  };
  return <VoteView {...props} />;
};
export default Vote;
