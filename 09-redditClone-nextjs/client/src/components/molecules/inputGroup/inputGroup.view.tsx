import React from "react";
import ErrorTextView from "../../atoms/errorText/errorText.view";
import InputsView, {InputGroupProps} from "../../atoms/inputs/inputs.view";

const InputGroupView = ({...inputValue}: InputGroupProps) => {
  return (
    <div className={'mb-5'}>
      <InputsView {...inputValue} />
      <ErrorTextView error={inputValue?.error}/>
    </div>
  )
}
export default InputGroupView
