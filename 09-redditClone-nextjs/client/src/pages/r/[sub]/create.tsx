import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import ButtonsView from "../../../components/atoms/buttons/buttons.view";
import InputsView from "../../../components/atoms/inputs/inputs.view";
import TextAreaView from "../../../components/atoms/inputs/textArea.view";
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

  return (
    <div className={"flex flex-col justify-center pt-16"}>
      <div className={"w-10/12 mx-auto md:w-96"}>
        <div className={"p-4 bg-white rounded"}>
          <h1 className={"mb-3 text-lg"}>포스트 생성하기</h1>

          <form onSubmit={submitPost}>
            <div className={"relative mb-2"}>
              <InputsView placeholder={"제목"} maxLength={20} value={title} onChange={(e) => setTitle(e.target.value)} />
              <div style={{ top: 8, right: 10 }} className={"absolute  mb-2 text-sm text-gray-400 select-none"}>
                {title.length} / 20
              </div>
            </div>
            <TextAreaView rows={4} placeholder={"설명"} value={body} onChange={(e) => setBody(e.target.value)} />

            <ButtonsView text={"생성하기"} />
          </form>
        </div>
      </div>
    </div>
  );
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
