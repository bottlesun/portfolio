import cls from "classnames";
import Image from "next/image";
import React from "react";
import { Sub } from "../../../../types/user";
import SideBar from "../../../molecules/sideBar/sideBar";

type SubpageViewType = {
  fileInputRef: React.RefObject<HTMLInputElement>;
  uploadImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sub: Sub;
  openFileInput: (type: string) => void;
  ownSub: boolean;
};

const SubpagesView = ({ fileInputRef, uploadImage, sub, openFileInput, ownSub }: SubpageViewType) => {
  return (
    <>
      <section>
        <input type="file" hidden={true} ref={fileInputRef} onChange={uploadImage} />
        {/* 배너 이미지*/}
        <div className={cls("bg-gray-400")}>
          {sub.bannerUrl ? (
            <div
              className={"h-56"}
              style={{
                backgroundImage: `url(${sub.bannerUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
              onClick={() => openFileInput("banner")}
            ></div>
          ) : (
            <div className={"h-20 bg-gray-400"} onClick={() => openFileInput("banner")}></div>
          )}
        </div>
        {/*커뮤니티 메타 데이터*/}
        <div className={"h-20 bg-white"}>
          <div className={"relative flex max-w-5xl px-5 mx-auto"}>
            <div className={"absolute"} style={{ top: -15 }}>
              {sub.imageUrl && <Image src={sub.imageUrl} alt={"커뮤니티 이미지"} width={"70"} height={"70"} className={cls("rounded-full", { "cursor-pointer": ownSub })} onClick={() => openFileInput("image")} />}
            </div>

            <div className={"pt-1 pl-24"}>
              <div className={"flex items-center"}>
                <h1 className={"text-3xl font-bold mb-1"}>{sub.title}</h1>
              </div>
              <p className={"text-small font-bold text-gray-400"}>/r/{sub.name}</p>
            </div>
          </div>
        </div>
      </section>
      {/*포스트 와 사이드바*/}
      <div className={"flex max-w-5xl px-4 pt-5 mx-auto"}>
        <div className={"w-full md:mr-3 md:w-8/12"}></div>
        <SideBar sub={sub} />
      </div>
    </>
  );
};

export default SubpagesView;
