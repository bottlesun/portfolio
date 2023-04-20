import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth";
import subRoutes from "./routes/subs";

// 최상위 함수
const app = express();
const origin = `http://localhost:3000`;
app.use(
  cors({
    // 다른 도메인을 같은 도메인으로 연결해준다
    origin,
    // 도메인 주소가 다르면 쿠키가 전송이 되지 않기에 맞춰주는 옵션
    credentials: true
  })
);
app.use(express.json());
//morgan 옵션 ( dev, short, common, combined ) 중 하나를 선택
app.use(morgan("dev"));
// cookie를 받아주기 위한 server 설정
app.use(cookieParser());

// server 에서 env 파일 적용 시키기.
dotenv.config();
// app.get의 url로 접속하면 해당 블록의 코드를 실행
app.get("/", (_, res) => {
  res.send("running");
});
// 해당 라우터로가서 있는 하위 값에 요청을 해준다
app.use("/api/auth", authRoutes);
app.use("/api/subs", subRoutes);

// app.listen의 첫번째 인자는 포트번호, 두번째 인자는 콜백함수
let port = 4000;
//app.listen의 포트로 접속하면 해당 블록의 비동기로 코드 실행
app.listen(port, async () => {
  console.log(`Server is running at ${process.env.APP_URL}`);

  AppDataSource.initialize()
    .then(() => {
      console.log("database initialized");
    })
    .catch((error) => console.log(error));
});
