import React, {FC, memo, useMemo} from "react";
import {IChat, IDM, IUser} from '@typings/db';
import {ChatWrapper} from "@components/Chat/styles";
import {useParams} from 'react-router';
import gravatar from 'gravatar';
import dayjs from 'dayjs';
import regexifyString from "regexify-string"
import {Link} from "react-router-dom";


interface Props {
  data: (IDM | IChat);
}


const Chat: FC<Props> = ({data}) => {
  const BACK_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3095' : 'https://sleact.nodebird.com';
  const {workspace} = useParams<{ workspace: string; channel: string }>();
  const user = 'Sender' in data ? data.Sender : data.User; // Sender 는 DM 에만 들어 있는 속성이다 in 문으로 삼항 연산자로 분류 ( 타입가드 )


  // 정규 표현식
  // \d 숫자 , ? 0~1개 , * 0개이상  , g는 모두찾기 , | 또는 , \n 줄바꿈 , ()그루핑  - 묶인 값이 arr[1] arr[2] 처럼 추가 된다.
  // + 최대한 많이 , +? 최대한 조금

  const result = useMemo<(string | JSX.Element)[] | JSX.Element>(
    () => // uploads 서버주소 문자열 \ 를 표현할땐 \\ 로 표현
      data.content.startsWith('uploads\\') || data.content.startsWith('uploads/') ? (
        <img src={`${BACK_URL}/${data.content}`} style={{ maxHeight: 200 }} />
      ) : (
        regexifyString({
          pattern: /@\[(.+?)]\((\d+?)\)|\n/g,
          decorator(match, index) {
            const arr: string[] | null = match.match(/@\[(.+?)]\((\d+?)\)/)!;
            if (arr) {
              return (
                <Link key={match + index} to={`/workspace/${workspace}/dm/${arr[2]}`}>
                  @{arr[1]}
                </Link>
              );
            }
            return <br key={index} />;
          },
          input: data.content,
        })
      ),
    [workspace, data.content],
  );



  return (
    <ChatWrapper>
      <div className="chat-img">
        <img src={gravatar.url(user.email, {s: '36px', d: 'retro'})} alt={user.nickname}/>
      </div>
      <div className="chat-text">
        <div className="chat-user">
          <b>{user.nickname}</b>
          <span>{dayjs(data.createdAt).format('h:mm A')}</span>
        </div>
        <p>{result}</p>
      </div>
    </ChatWrapper>
  )
};

export default memo(Chat);