import axios from "axios";
import { FormEvent, useState } from "react";
import { SlugCommentsPropsType } from "../../../../types/slug.type";
import SlugTextAreaView from "./slugTextArea.view";

const SlugTextArea = (textArea: SlugCommentsPropsType) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    try {
      await axios.post(`/posts/${textArea.post?.identifier}/${textArea.post?.slug}/comments`, { body: newComment });
      await textArea.mutate();
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const props = {
    ...textArea,
    newComment: newComment,
    setNewComment: setNewComment,
    handleSubmit: handleSubmit
  };

  return <SlugTextAreaView {...props} />;
};

export default SlugTextArea;
