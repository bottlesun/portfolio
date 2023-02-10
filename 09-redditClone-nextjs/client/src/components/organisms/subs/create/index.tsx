import {useState} from "react";
import useInput from "../../../../hooks/useInput";
import SubCreateView from "./create.view";

const SubCreate = () => {
  const {inputs, onChange} = useInput({title : "" , description : "",})
  const {title, description} = inputs
  const [errors, setErrors] = useState<any>({});

  const props = {
    handleSubmit : () => console.log('서브밋'),
    inputValue: {
      title : {
        name: "title",
        type: "text",
        placeholder: 'title',
        value: title,
        onChange: onChange,
        error: errors.title
      },
      description : {
        name: "description",
        type: "text",
        placeholder: 'description',
        value: description,
        onChange: onChange,
        error: errors.description
      }
    },

  }

  return <SubCreateView {...props}/>
}

export default SubCreate
