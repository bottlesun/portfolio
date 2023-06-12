import React from "react";
import { slugPropsType } from "../../../../types/slug.type";
import Vote from "../../../atoms/buttons/vote/vote";
import SlugComments from "../../../molecules/slug/slugComments";
import SlugInfoView from "../../../molecules/slug/slugInfo.view";

const SlugView = ({ post, authenticated, postsMutate }: slugPropsType) => {
  return (
    <div className={"flex max-w-5xl px-4 pt-5  mx-auto"}>
      <div className={"w-full md:mr-3 md:w-8/12"}>
        <div className={"bg-white rounded"}>
          {post && (
            <>
              <div className={"flex "}>
                <Vote post={post} authenticated={authenticated} mutate={postsMutate} />
                <SlugInfoView {...post} />
              </div>
              <SlugComments post={post} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default SlugView;
