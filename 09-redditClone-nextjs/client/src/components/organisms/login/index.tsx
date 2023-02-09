import Axios from "axios";
import {useRouter} from "next/router";
import {FormEvent, useCallback, useState} from "react";
import {useAuthDispatch} from "../../../context/auth";
import useInput from "../../../hooks/useInput";
import LoginView from "./login.view";

const Login = () => {
  const router = useRouter();
  const {inputs, onChange} = useInput({email: '', username: '', password: ''})
  const {username, password} = inputs
  const [errors, setErrors] = useState<any>({});

  const dispatch = useAuthDispatch();

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await Axios.post("/auth/login",
        {
          password,
          username
        },
        {
          // https ajax 요청 옵션 withCredentials
          // cookie token 발급 다른 페이지에서도 토큰 확인 가능
          withCredentials : true
        }
      )
      // 유저 정보를 context 보관 해주기
      dispatch('LOGIN',res.data.user);

      return router.push('/');
    } catch (error : Error | any){
      console.error(error);
      setErrors(error?.response.data || {});
    }
  }, [username, password])

  const props = {
    handleSubmit: handleSubmit,
    inputValue: {
      username: {
        name: "username",
        type: "text",
        placeholder: 'Username',
        value: username,
        onChange: onChange,
        error: errors.username
      },
      password: {
        name: "password",
        type: "password",
        placeholder: 'Password',
        value: password,
        onChange: onChange,
        error: errors.username
      },
    },
    buttonsValue: {
      login: {
        children: '로그인',
        type: 'submit',
        onClick: handleSubmit,
        disabled: false
      },
    }
  }

  return <LoginView {...props} />
}
export default Login
