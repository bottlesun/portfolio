import React from "react";
import { slugPropsType } from "../../../../types/slug.type";
import Vote from "../../../atoms/buttons/vote/vote";
import SlugComments from "../../../molecules/slug/slugComments";
import SlugInfoView from "../../../molecules/slug/slugInfo.view";

const SlugView = ({ post }: slugPropsType) => {
  return (
    <div className={"flex max-w-5xl px-4 pt-5  mx-auto"}>
      <div className={"w-full md:mr-3 md:w-8/12"}>
        <div className={"bg-white rounded"}>
          {post && (
            <>
              <div className={"flex"}>
                <Vote data={post} />
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
