import classNames from "classnames";
import React from "react";
import { Comment, Post } from "../../../../types/user";

export type VoteViewProps = {
  data: Post | Comment;
  onVoteValue?: Post | Comment;
  onVote: (value: number, comment?: Comment) => void;
};

const VoteView = ({ data, onVote, onVoteValue }: VoteViewProps) => {
  return (
    <>
      {/*좋아요 싫어요 기능 구현*/}
      <div className={"flex-shrink-0 w-10 py-2 text-center rounded-l"}>
        {/*좋아요 부분*/}
        <div className={"w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"} onClick={() => onVote(1, onVoteValue)}>
          <i className={classNames("fas fa-arrow-up", { "text-red-500": data?.userVote === 1 })} />
        </div>
        <p className={"text-xs font-bold"}>{data?.voteScore}</p>
        {/*싫어요 부분*/}
        <div className={"w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-500"} onClick={() => onVote(-1, onVoteValue)}>
          <i className={classNames("fas fa-arrow-down", { "text-blue-500": data?.userVote === -1 })} />
        </div>
      </div>
    </>
  );
};
export default VoteView;
