import React from "react";
import { SlugCommentsType } from "../../../types/slug.type";
import SlugListBoxView from "../../atoms/box/slugListBox.view";
import Vote from "../../atoms/buttons/vote/vote";
import SlugTextArea from "../../atoms/inputs/slugTextArea/slugTextArea";

const SlugCommentsView = ({ comments, list }: SlugCommentsType) => {
  return (
    <>
      {/*댓글 작성 구간*/}
      <SlugTextArea {...comments} />
      {/*댓글 리스트*/}
      {list.comments?.map((comment) => (
        <div className={"flex"} key={comment.identifier}>
          <Vote post={comments.post} authenticated={comments.authenticated} comment={comment} mutate={comments.mutate} />
          <SlugListBoxView {...comment} />
        </div>
      ))}
    </>
  );
};
export default SlugCommentsView;
