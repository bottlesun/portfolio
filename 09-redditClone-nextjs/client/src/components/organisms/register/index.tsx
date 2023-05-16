import axios from "axios";
import Error from "next/error";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useState } from "react";
import { useAuthState } from "../../../context/auth";
import useInput from "../../../hooks/useInput";
import RegisterView from "./register.view";

const Register = () => {
  const router = useRouter();
  const { inputs, onChange } = useInput({ email: "", username: "", password: "" });
  const { email, username, password } = inputs;
  const [errors, setErrors] = useState<any>({});
  const { authenticated } = useAuthState();

  if (authenticated) router.push("/");

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        const res = await axios.post("/auth/register", {
          email,
          password,
          username
        });
        console.log("res", res);
        return router.push("/login");
      } catch (error: Error | any) {
        console.log("error = ", error);
        setErrors(error?.response?.data || {});
      }
    },
    [email, username, password]
  );

  const props = {
    handleSubmit: handleSubmit,
    inputValue: {
      email: {
        name: "email",
        type: "email",
        placeholder: "Email",
        value: email,
        onChange: onChange,
        error: errors.email
      },
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
      }
    },
    buttonsValue: {
      register: {
        children: "회원가입",
        type: "submit",
        onClick: handleSubmit,
        disabled: false
      }
    }
  };

  return <RegisterView {...props} />;
};
export default Register;
