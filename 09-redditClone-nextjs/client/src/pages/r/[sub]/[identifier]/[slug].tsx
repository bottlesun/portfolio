import axios from "axios";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import useSWR from "swr";
import SlugView from "../../../../components/organisms/identifier/slug/slug.view";
import { useAuthState } from "../../../../context/auth";
import { slugPropsType } from "../../../../types/slug.type";
import { Comment, Post } from "../../../../types/user";

const PostPage = () => {
  const router = useRouter();
  const { identifier, sub, slug } = router.query;
  const { authenticated, user } = useAuthState();
  const { data: post, error } = useSWR<Post>(identifier && slug ? `/posts/${identifier}/${slug}` : null);
  const { data: comments, mutate } = useSWR<Comment[]>(identifier && slug ? `/posts/${identifier}/${slug}/comments` : null);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    try {
      await axios.post(`/posts/${post?.identifier}/${post?.slug}/comments`, { body: newComment });
      await mutate();
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const props = {
    postProps: { post },
    commentsProps: {
      textArea: {
        authenticated,
        user,
        newComment,
        setNewComment,
        handleSubmit
      },
      list: {
        comments: comments
      }
    }
  } as slugPropsType;

  return <SlugView {...props} />;
};

export default PostPage;
