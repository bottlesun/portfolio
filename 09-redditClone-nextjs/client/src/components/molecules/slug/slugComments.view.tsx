import React from "react";
import { SlugCommentsType } from "../../../types/slug.type";
import SlugListBoxView from "../../atoms/box/slugListBox.view";
import SlugTextAreaView from "../../atoms/inputs/slugTextArea.view";

const SlugCommentsView = ({ textArea, list }: SlugCommentsType) => {
  return (
    <>
      {/*댓글 작성 구간*/}
      <SlugTextAreaView {...textArea} />
      {/*댓글 리스트*/}
      {list.comments?.map((comment) => (
        <SlugListBoxView key={comment.identifier} {...comment} />
      ))}
    </>
  );
};
export default SlugCommentsView;
