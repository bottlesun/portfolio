import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import PostCreateView from "../../../components/organisms/identifier/create/create.view";
import { Post } from "../../../types/user";

const PostCreate = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { sub: subName } = router.query;
  const submitPost = async (event: FormEvent) => {
    event.preventDefault();

    if (title.trim() === "" || !subName) return;

    try {
      const { data: post } = await axios.post<Post>("/posts", {
        title: title.trim(),
        body,
        sub: subName
      });

      return router.push(`/r/${subName}/${post.identifier}/${post.slug}`);
    } catch (error) {
      console.log(error);
    }
  };

  const props = {
    submitPost,
    title,
    setTitle,
    body,
    setBody
  };
  return <PostCreateView {...props} />;
};
export default PostCreate;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) throw new Error("Missing auth token cookie");

    await axios.get("/auth/me", { headers: { cookie } });
    return { props: {} };
  } catch (error) {
    console.log(error);
    res.writeHead(307, { Location: "/login" }).end();

    return { props: {} };
  }
};
