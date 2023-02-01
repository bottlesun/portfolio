import {useState} from "react";
import useInput from "../../../hooks/useInput";
import RegisterView from "./register.view";

const Register = () => {
  const {inputs, onChange} = useInput({email: '', username: '', password: ''})
  const {email, username, password} = inputs
  const [error, setError] = useState<any>({});
  const handleSubmit = () => {
    console.log('서브밋')
  }

  const props = {
    handleSubmit: handleSubmit,
    inputValue: {
      email: {
        name: "email",
        type: "email",
        placeholder: 'email',
        value: email,
        onChange: onChange,
        error: ""
      },
      username: {
        name: "username",
        type: "text",
        placeholder: 'username',
        value: username,
        onChange: onChange,
        error: ""
      },
      password: {
        name: "password",
        type: "password",
        placeholder: 'password',
        value: password,
        onChange: onChange,
        error: ""
      },
    },
    buttonsValue: {
      register: {
        children: '회원가입',
        type : 'button',
        onClick : () => console.log('click'),
        disabled : false
      }
    }
  }


  return <RegisterView {...props}/>
}
export default Register
