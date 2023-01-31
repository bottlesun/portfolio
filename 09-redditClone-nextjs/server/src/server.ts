import express from 'express';
import morgan from 'morgan';
import {AppDataSource} from "./data-source";

// 최상위 함수
const app = express();

app.use(express.json());
//morgan 옵션 ( dev, short, common, combined ) 중 하나를 선택
app.use(morgan('dev'));

// app.get의 url로 접속하면 해당 블록의 코드를 실행
app.get('/', (_, res) => {
  res.send('running');
});

// app.listen의 첫번째 인자는 포트번호, 두번째 인자는 콜백함수
let port = 4000;
//app.listen의 포트로 접속하면 해당 블록의 비동기로 코드 실행
app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);

  AppDataSource.initialize().then(() => {
    console.log("database initialized")
  }).catch(error => console.log(error))

});
