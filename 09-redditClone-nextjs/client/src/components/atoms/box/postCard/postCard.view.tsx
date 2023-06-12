import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Post } from "../../../../types/user";
import Vote from "../../buttons/vote/vote";

type PostCardViewProps = {
  post: Post;
  vote?: (value: number) => void;
  isInSubPage: boolean;
};
const PostCardView = ({ post, vote, isInSubPage }: PostCardViewProps) => {
  const { title, body, subName, createdAt, commentCount, url, username, sub } = post;

  return (
    <div className={"flex mb-4 bg-white rounded"} id={post.identifier}>
      <Vote post={post} vote={vote} />

      {/* 포스트 데이터 부분 */}
      <div className={"w-full p-2"}>
        <div className={"flex items-center"}>
          {!isInSubPage && (
            <div className={"flex items-center"}>
              <Link href={`/r/${subName}`}>{sub && <Image src={sub?.imageUrl} alt="sub" className={"rounded-full cursor-pointer"} width={12} height={12} />}</Link>
              <Link href={`/r/${subName}`} className={"text-xs font-bold cursor-pointer hover:underline"}>
                /r/{subName}
              </Link>
              <span className={"mx-1 text-xs text-gray-500"}>·</span>
            </div>
          )}
          <p className={"text-xs text-gray-400"}>
            Posted by
            <Link href={`/u/${username}`} className={"mx-1 hover:underline"}>
              /u/{username}
            </Link>
            <Link href={url} className={"mx-1 hover:underline"}>
              {dayjs(createdAt).format("YYYY-MM-DD HH:mm")}
            </Link>
          </p>
        </div>

        <Link href={url} className={"my-1 text-lg font-medium"}>
          {title}
        </Link>
        {body && <p className={"my-1 text-sm"}>{body}</p>}

        <div className={"flex"}>
          <Link href={url}>
            <div>
              <i className={"mr-1 fas fa-comment-alt fa-xs"}></i>
              <span>{commentCount}</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default PostCardView;
