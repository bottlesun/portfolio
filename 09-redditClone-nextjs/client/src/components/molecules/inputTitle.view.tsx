import React,{memo} from "react";

type inputTitleProps= {
  title: string,
  text: string
}
const InputTitleView = ({title, text}:inputTitleProps) => {
  return(
    <>
      <p className={'font-bold'}>{title}</p>
      <p className={'mb-2 text-xs text-gray-400'}>
        {text}
      </p>
    </>
  )
}
export default memo(InputTitleView)
