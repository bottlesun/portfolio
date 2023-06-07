import dayjs from "dayjs";
import Link from "next/link";
import React from "react";

const SlugListBoxView = ({ ...comment }) => {
  return (
    <div className={"flex"}>
      <div className={"py-2 pr-2"}>
        <p className={"mb-1 text-xs leading-none"}>
          <Link href={`/u/${comment.username}`} className={"mr-1 font-bold hover:underline"}>
            {comment.username}
          </Link>
          <span className={"text-gray-600"}>
            {`
                  ${comment.voteScore}
                  points •
                  ${dayjs(comment.createdAt).format("YYYY-MM-DD HH:mm")}
                  `}
          </span>
        </p>
        <p>{comment.body}</p>
      </div>
    </div>
  );
};
export default SlugListBoxView;
