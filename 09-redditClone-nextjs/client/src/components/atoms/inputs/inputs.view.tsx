import cls from "classnames";
import React from "react";

export type InputGroupProps = React.InputHTMLAttributes<HTMLInputElement> & { error?: string };

const InputsView = ({ ...props }: InputGroupProps) => {
  return <input style={{ minWidth: 300 }} type={!props.type ? "text" : props.type} className={cls(`w-full p-2 transition duration-200 border border-gray-300 rounded bg-gray-50 focus:bg-white hover:bg-white text-[13px]`, { "border-red-500": props.error })} {...props} />;
};

export default InputsView;
