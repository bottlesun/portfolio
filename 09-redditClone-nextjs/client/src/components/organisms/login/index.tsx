import Axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { useAuthDispatch, useAuthState } from "../../../context/auth";
import useInput from "../../../hooks/useInput";
import LoginView from "./login.view";

const Login = () => {
  const router = useRouter();
  const { inputs, onChange } = useInput({ email: "", username: "", password: "" });
  const { username, password } = inputs;
  const [saved, setSaved] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});
  const dispatch = useAuthDispatch();
  const state = useAuthState();

  console.log(state.user);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const saved = localStorage.getItem("saved");

    if (username != null) {
      inputs.username = username;
    }
    if (saved != null) {
      setSaved(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        const res = await Axios.post(
          "/auth/login",
          {
            password,
            username
          },
          {
            // https ajax 요청 옵션 withCredentials
            // cookie token 발급 다른 페이지에서도 토큰 확인 가능
            withCredentials: true
          }
        );
        // 유저 정보를 context 보관 해주기
        dispatch("LOGIN", res.data.user);
        if (saved) {
          localStorage.setItem("username", username);
          localStorage.setItem("saved", String(saved));
        } else {
          localStorage.removeItem("username");
          localStorage.removeItem("saved");
        }

        return router.push("/");
      } catch (error: Error | any) {
        console.error(error);
        setErrors(error?.response.data || {});
      }
    },
    [username, password]
  );

  const props = {
    handleSubmit: handleSubmit,
    inputValue: {
      username: {
        name: "username",
        type: "text",
        placeholder: "Username",
        value: username,
        onChange: onChange,
        error: errors.username
      },
      password: {
        name: "password",
        type: "password",
        placeholder: "Password",
        value: password,
        onChange: onChange,
        error: errors.password
      },
      idSave: {
        name: "idSave",
        type: "checkbox",
        placeholder: "아이디 저장",
        checked: saved,
        onChange: (e: ChangeEvent<HTMLInputElement>) => setSaved(e.target.checked)
      }
    },
    buttonsValue: {
      login: {
        children: "로그인",
        type: "submit",
        onClick: handleSubmit,
        disabled: false
      }
    }
  };

  return <LoginView {...props} />;
};
export default Login;
