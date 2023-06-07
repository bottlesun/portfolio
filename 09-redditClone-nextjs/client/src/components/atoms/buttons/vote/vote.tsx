import { Comment, Post } from "../../../../types/user";
import VoteView from "./vote.view";

export type VoteProps = {
  data: Post | Comment;
};
const Vote = ({ data }: VoteProps) => {
  const props = {
    data: data
  };
  return <VoteView {...props} />;
};
export default Vote;
