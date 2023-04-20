import cls from "classnames";
import React from "react";

export type InputGroupProps = {
  type?: string;
  error: string | undefined;
  placeholder?: string;
  value?: string;

  setValue?: (str: string) => void;
  onChange?: () => void;
  name: string;
};

const InputsView = ({ ...props }: InputGroupProps) => {
  return <input style={{ minWidth: 300 }} className={cls(`w-full p-2 transition duration-200 border border-gray-300 rounded bg-gray-50 focus:bg-white hover:bg-white text-[13px]`, { "border-red-500": props.error })} {...props} />;
};

export default InputsView;
