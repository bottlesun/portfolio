import Link from "next/link";
import React from "react";
import { SlugCommentsTextAreaType } from "../../../types/slug.type";

const SlugTextAreaView = ({ authenticated, user, handleSubmit, setNewComment, newComment }: SlugCommentsTextAreaType) => {
  return (
    <div className={" pr-6 mb-4"}>
      {authenticated ? (
        <div>
          <p className={"mb-1 text-xs"}>
            <Link href={`/u/${user?.username}`} className={"font-semibold text-blue-500"}>
              {user?.username}
            </Link>
            {""} 으로 댓글 작성
          </p>
          <form onSubmit={handleSubmit}>
            <textarea className={"w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-600"} onChange={(e) => setNewComment(e.target.value)} value={newComment}></textarea>

            <div className={"flex justify-end"}>
              <button className={"px-3 py-1 text-white bg-gray-400 rounded"} disabled={newComment.trim() === ""}>
                댓글작성
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className={"flex items-center justify-between px-2 py-4 border border-gray-200 rounded"}>
          <p className={"font-semibold text-gray-500"}>로그인 후 댓글을 작성할 수 있습니다.</p>
          <div>
            <Link href={"/login"} className={"px-3 py-1 text-shite bg-gray-400 rounded text-white"}>
              로그인
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default SlugTextAreaView;
