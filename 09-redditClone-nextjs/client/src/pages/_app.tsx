import '../styles/globals.css'
import Axios from "axios";
import type {AppProps} from 'next/app'

export default function App({Component, pageProps}: AppProps) {
  // next 는 환경변수 의 제목이 NEXT_PUBLIC_ 로 시작해야한다.
  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";

  return <Component {...pageProps} />
}
