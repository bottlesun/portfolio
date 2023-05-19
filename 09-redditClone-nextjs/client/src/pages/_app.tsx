import Axios from "axios";
import axios from "axios/index";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import NavBar from "../components/molecules/navBar/navBar";
import { AuthProvider } from "../context/auth";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  // next 는 환경변수 의 제목이 NEXT_PUBLIC_ 로 시작해야한다.
  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
  // cookie token 발급 다른 페이지에서도 토큰 확인 가능
  Axios.defaults.withCredentials = true;

  const { pathname } = useRouter();
  const authRoutes = ["/register", "/login"];
  const authRoute = authRoutes.includes(pathname);

  const fetcher = async (url: string) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  };

  return (
    <SWRConfig value={{ fetcher }}>
      <AuthProvider>
        {!authRoute && <NavBar />}
        <div className={authRoute ? "" : "pt-16"}>
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </SWRConfig>
  );
}
