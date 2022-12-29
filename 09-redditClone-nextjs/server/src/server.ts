import express from 'express';
import morgan from 'morgan';
import {AppDataSource} from "./data-source";

const app = express();

app.use(express.json());
//morgan 옵션 ( dev, short, common, combined ) 중 하나를 선택
app.use(morgan('dev'));

app.get('/', (_, res) => {
  res.send('running');
});

let port = 4000;

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);

  AppDataSource.initialize().then(async () => {
    console.log("database initialized");
  }).catch(error => console.log(error))
});
