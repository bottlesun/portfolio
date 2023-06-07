import React from "react";
import { slugPropsType } from "../../../../types/slug.type";
import SlugCommentsView from "../../../molecules/slug/slugComments.view";
import SlugInfoView from "../../../molecules/slug/slugInfo.view";

const SlugView = ({ postProps, commentsProps }: slugPropsType) => {
  return (
    <div className={"flex max-w-5xl px-4 pt-5  mx-auto"}>
      <div className={"w-full md:mr-3 md:w-8/12"}>
        <div className={"bg-white rounded"}>
          {postProps.post && (
            <>
              <div className={"flex flex-col"}>
                <SlugInfoView {...postProps} />
                <SlugCommentsView {...commentsProps} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default SlugView;
