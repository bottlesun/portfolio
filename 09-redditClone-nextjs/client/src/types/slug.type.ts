import { Dispatch, FormEvent, SetStateAction } from "react";
import { SWRResponse } from "swr/_internal";
import { State } from "../context/auth";
import { Comment, Post } from "./user";

export type slugPropsType = {
  post: SlugInfType;
  authenticated: State["authenticated"];
  postsMutate: SWRResponse<Post[] | any>["mutate"];
};

export type SlugCommentsType = {
  comments: SlugCommentsPropsType;
  list: SlugCommentsListType;
};

export type SlugInfType = Post;

export type SlugCommentsPropsType = {
  mutate: SWRResponse<Comment[]>["mutate"];
  post: Post;
} & Pick<State, "authenticated" | "user">;

export type SlugCommentsTextAreaType = {
  setNewComment: Dispatch<SetStateAction<string>>;
  newComment: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
} & Pick<State, "authenticated" | "user">;

export type SlugCommentsListType = { comments: Comment[] };
