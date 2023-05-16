import React from "react";

export type buttonTypes = {
  children?: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
  disabled?: boolean;
  text?: string;
  href?: string;
};
const ButtonsView = ({ children, type, onClick, disabled, text }: buttonTypes) => {
  return (
    <button onClick={onClick} type={type} disabled={disabled === undefined ? false : disabled} className={"w-full py-2 px-2 text-xs font-bold text-white uppercase bg-gray-600 rounded-[3px]"}>
      {children || text}
    </button>
  );
};

export default React.memo(ButtonsView);
