import {useState} from "react";
import useInput from "../../../../hooks/useInput";
import SubCreateView from "./create.view";

const SubCreate = () => {
  const {inputs, onChange} = useInput({name: "", title: "", description: "",})
  const {name, title, description} = inputs
  const [errors, setErrors] = useState<any>({});

  const props = {
    handleSubmit: () => console.log('서브밋'),
    inputValue: {
      name: {
        top: {
          title: 'Name',
          text: '대문자를 포함한 커뮤니티 이름은 변경할 수 없습니다.'
        },
        inputs: {
          name: "name",
          type: "text",
          placeholder: '이름',
          value: name,
          onChange: onChange,
          error: errors.name,
        }
      },
      title: {
        top: {
          title: 'title',
          text: '커뮤니티 제목은 주제를 나타냅니다. 언제든지 변경할 수 있습니다.'
        },
        inputs: {
          name: "title",
          type: "text",
          placeholder: '제목',
          value: title,
          onChange: onChange,
          error: errors.title,
        }
      },
      description: {
        top: {
          title: 'Description',
          text: '새로운 회원이 커뮤니티를 이해하는 방법입니다.'
        },
        inputs: {
          name: "description",
          type: "text",
          placeholder: '설명',
          value: description,
          onChange: onChange,
          error: errors.description
        }
      }
    },

  }

  return <SubCreateView {...props}/>
}

export default SubCreate
