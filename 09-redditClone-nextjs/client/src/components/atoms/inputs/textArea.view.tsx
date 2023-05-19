import cls from "classnames";
import React, { TextareaHTMLAttributes } from "react";

export type TextAreaGroupProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string };

const TextAreaView = ({ ...props }: TextAreaGroupProps) => {
  return <textarea {...props} className={cls(`w-full p-2 transition duration-200 border border-gray-300 rounded bg-gray-50 focus:bg-white hover:bg-white text-[13px]`, { "border-red-500": props.error })} />;
};
export default TextAreaView;
