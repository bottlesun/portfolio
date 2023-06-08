import axios from "axios";
import { useRouter } from "next/router";
import { SWRResponse } from "swr/_internal";
import { useAuthState } from "../../../../context/auth";
import { Post, Sub } from "../../../../types/user";
import PostCardView from "./postCard.view";

type PostCardProps = {
  post: Post;
  mutate: SWRResponse<Sub[]>["mutate"];
};
const PostCard = ({ post, mutate }: PostCardProps) => {
  const { identifier, slug, userVote } = post;
  const router = useRouter();
  const isInSubPage = router.pathname === "/r/[sub]";
  const { authenticated } = useAuthState();

  const onVote = async (value: number) => {
    if (!authenticated) await router.push("/login");

    if (value === userVote) value = 0;

    try {
      await axios.post("/votes", {
        identifier,
        slug,
        value
      });
      if (mutate) {
        await mutate();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <PostCardView post={post} vote={onVote} isInSubPage={isInSubPage} />;
};

export default PostCard;
