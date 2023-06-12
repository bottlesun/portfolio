import React, { FormEvent } from "react";
import ButtonsView from "../../../atoms/buttons/buttons.view";
import InputsView from "../../../atoms/inputs/inputs.view";
import TextAreaView from "../../../atoms/inputs/textArea.view";

type PostCreateType = {
  submitPost: (e: FormEvent<HTMLFormElement>) => void;
  title: string;
  setTitle: (e: string) => void;
  body: string;
  setBody: (e: string) => void;
};
const PostCreateView = ({ submitPost, title, setTitle, body, setBody }: PostCreateType) => {
  return (
    <div className={"flex flex-col justify-center pt-16"}>
      <div className={"w-10/12 mx-auto md:w-96"}>
        <div className={"p-4 bg-white rounded"}>
          <h1 className={"mb-3 text-lg"}>포스트 생성하기</h1>

          <form onSubmit={submitPost}>
            <div className={"relative mb-2"}>
              <InputsView placeholder={"제목"} maxLength={20} value={title} onChange={(e) => setTitle(e.target.value)} />
              <div style={{ top: 8, right: 10 }} className={"absolute  mb-2 text-sm text-gray-400 select-none"}>
                {title.trim().length} / 20
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

export default PostCreateView;
