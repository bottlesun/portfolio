import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import SlugView from "../../../../components/organisms/identifier/slug/slug.view";
import { useAuthState } from "../../../../context/auth";
import { slugPropsType } from "../../../../types/slug.type";
import { Post } from "../../../../types/user";

const PostPage = () => {
  const router = useRouter();
  const { identifier, sub, slug } = router.query;
  const { data: post, error, mutate } = useSWR<Post>(identifier && slug ? `/posts/${identifier}/${slug}` : null);
  const { authenticated } = useAuthState();

  const props = {
    post: post,
    authenticated: authenticated,
    postsMutate: mutate
  } as slugPropsType;
  return <SlugView {...props} />;
};

export default PostPage;
