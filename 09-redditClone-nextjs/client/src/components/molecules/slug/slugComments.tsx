import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { useAuthState } from "../../../context/auth";
import { SlugCommentsType } from "../../../types/slug.type";
import { Comment } from "../../../types/user";
import SlugCommentsView from "./slugComments.view";

const SlugComments = ({ ...post }) => {
  const router = useRouter();
  const { identifier, sub, slug } = router.query;
  const { authenticated, user } = useAuthState();
  const { data: comments, mutate } = useSWR<Comment[]>(identifier && slug ? `/posts/${identifier}/${slug}/comments` : null);

  const props = {
    comments: {
      post,
      mutate: mutate,
      authenticated,
      user
    },
    list: {
      comments: comments
    }
  } as SlugCommentsType;

  return (
    <>
      <SlugCommentsView {...props} />
    </>
  );
};
export default SlugComments;
