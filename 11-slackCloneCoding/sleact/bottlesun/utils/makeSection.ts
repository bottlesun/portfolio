import {IDM , IChat} from '@typings/db';
import dayjs from 'dayjs';

export default function makeSection(chatlist : (IDM | IChat)[]) {
  const sections : {[key:string] : (IDM | IChat)[]} = {};
  chatlist.forEach((chat) => {
    const monthDate = dayjs(chat.createdAt).format('YYYY-MM-DD');
    if(Array.isArray(sections[monthDate])) {
      sections[monthDate].push(chat);
    } else {
      sections[monthDate] = [chat];
    }
  });

  return sections;
}


// 알고리즘 , 사람이 생각하는대로 하면 반은 간다.