import Axios from "axios";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/auth";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  // next 는 환경변수 의 제목이 NEXT_PUBLIC_ 로 시작해야한다.
  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
  // cookie token 발급 다른 페이지에서도 토큰 확인 가능
  Axios.defaults.withCredentials = true;

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
