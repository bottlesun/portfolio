import { Dispatch, FormEvent, SetStateAction } from "react";
import { State } from "../context/auth";
import { Comment, Post } from "./user";

export type slugPropsType = { postProps: SlugInfType; commentsProps: SlugCommentsType };

export type SlugCommentsType = {
  textArea: SlugCommentsTextAreaType;
  list: SlugCommentsListType;
};

export type SlugInfType = { post: Post };

export type SlugCommentsTextAreaType = {
  setNewComment: Dispatch<SetStateAction<string>>;
  newComment: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
} & Pick<State, "authenticated" | "user">;

export type SlugCommentsListType = { comments: Comment[] };
