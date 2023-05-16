import Axios from "axios";
import { GetServerSideProps } from "next";
import SubCreate from "../../components/organisms/subs/create";

const Create = () => {
  return (
    <>
      <SubCreate />
    </>
  );
};
export default Create;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const cookie = req.headers.cookie;

    // 쿠키가 없다면 에러 보내기
    if (!cookie) throw new Error("Missing auth token cookie");

    // 쿠키가 있다면 쿠키를 사용하여 백엔드에서 인증 처리하기
    await Axios.get("/auth/me", { headers: { cookie } });

    return { props: {} };
  } catch (error) {
    // 백엔드에서 요청해서 던져준 쿠키를 이용해 인증 처리할 때 에러가 나면 /login 페이지로 이동
    // 307 error code는 redirect를 의미
    res.writeHead(307, { Location: "/login" }).end();
    return { props: {} };
  }
};
