import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Container, Header} from "@pages/DirectMessage/styles";
import gravatar from "gravatar";
import {useParams} from "react-router";
import useSWR from "swr";
import useSWRInfinite from 'swr/infinite';
import fetcher from "@utils/fetcher";
import ChatBox from "@components/ChatBox";
import ChatList from "@components/ChatList";
import useInput from "@hooks/useInput";
import useSocket from '@hooks/useSocket';
import axios from "axios";
import makeSection from "@utils/makeSection";
import {Scrollbars} from "react-custom-scrollbars";
import {IDM, IChat} from "typings/db"
import {DragOver} from "@pages/Channel/styles";

const PAGE_SIZE = 20;
const DirectMessage = () => {
  const {workspace, id} = useParams<{ workspace: string, id: string }>();
  const [socket] = useSocket(workspace);
  const {data: userData} = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const {data: myData} = useSWR('/api/users', fetcher);
  const [chat, onChangeChat, setChat] = useInput('');
  const {data: chatData, mutate: mutateChat, setSize} = useSWRInfinite((index) =>
      `/api/workspaces/${workspace}/dms/${id}/chats?perPage=${PAGE_SIZE}&page=${index + 1}`,
    fetcher
  );
  // 무한 스크롤 구현시 같이 구현하면 좋은 것들.
  const isEmpty = chatData?.[0]?.length === 0; // 데이터가 비어있다.
  const isReachingEnd = isEmpty || (chatData && chatData[chatData.length - 1]?.length < 20) || false;
  // isEmpty는 아니지만 data가 숫자보다 적으니까 다 가지고 왔다 는 뜻.

  const scrollbarRef = useRef<Scrollbars>(null);
  const [dragOver, setDragOver] = useState(false)
  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    console.log(chat)
    if (chat?.trim() && chatData) { //trim() 공백제거
      mutateChat((prevChatData) => { // Optimistic - dummy data를 만들어서, 데이터가 서버에 전송 된 척 미리 유저에게 보여주기
        // Optimistic 쓰는 이유 - 서버 post 시 서버 요청 등 시간이 소요 되기에 딜레이가 존재 한다. 그것을 완화 시켜주고자 하는 방법 안정성 x 사용성 ↑
        const savedChat = chat;
        prevChatData?.[0].unshift({
          id: (chatData[0][0]?.id || 0) + 1,
          content: savedChat,
          SenderId: myData.id,
          Sender: myData,
          ReceiverId: userData.id,
          Receiver: userData,
          createdAt: new Date(),
        });
        return prevChatData;
      }, false) // Optimistic UI 시에 opts 값은 false 여야 한다.
        .then(() => {
          setChat(''); // 채팅 등록 후 기존 채팅창 글자 지우기
          scrollbarRef.current?.scrollToBottom();
        })
      axios.post(`/api/workspaces/${workspace}/dms/${id}/chats`, {
        content: chat,
      })
        .then(() => {
          mutateChat();
        })
        .catch(console.error);
    }
  }, [chat, chatData, myData, userData, workspace, id]);

  const onMessage = useCallback(
    // id 는 상대방 아이디
    (data: IDM) => {
      if (data.SenderId === Number(id) && myData.id !== Number(id)) { // myData.id !== Number(id) 내 아이디가 아닌 것만
        mutateChat((chatData) => { // socket 을 사용하여 실시간으로 DM DATA 를 주고 있기 때문에 mutateChat 으로 그냥 호출
          chatData?.[0].unshift(data); // 가장 최신 배열의 가장 최신으로 데이터 넣기
          return chatData;
        }, false).then(() => {
          if (scrollbarRef.current) {
            if ( // 남이 채팅을 쳤을때 기준 , 스크롤바를 150 미만으로 올렸을때는 스크롤 바를 밑으로 내린다 그 이외에는 무시
              scrollbarRef.current.getScrollHeight() <
              scrollbarRef.current.getClientHeight() + scrollbarRef.current.getScrollTop() + 150
            ) {
              console.log('scrollToBottom!', scrollbarRef.current?.getValues());
              setTimeout(() => {
                scrollbarRef.current?.scrollToBottom();
              }, 50)
            }
          }
        });
      }
    }, []);

  useEffect(() => {
    socket?.on('dm', onMessage);
    return () => {
      socket?.off('dm', onMessage);
    }
  }, [socket, onMessage])

  // 로딩 시 스크롤 바 제일 아래로
  useEffect(() => {
    if (chatData?.length === 1) {
      scrollbarRef.current?.scrollToBottom();
    }
  }, [chatData])

  useEffect(() => {
    localStorage.setItem(`${workspace}-${id}`, new Date().getTime().toString());
  }, [workspace, id]);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      console.log(e);
      const formData = new FormData();
      if (e.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < e.dataTransfer.items.length; i++) {
          // If dropped items aren't files, reject them
          if (e.dataTransfer.items[i].kind === 'file') {
            const file = e.dataTransfer.items[i].getAsFile();
            console.log('... file[' + i + '].name = ' + file.name);
            formData.append('image', file);
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          console.log('... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
          formData.append('image', e.dataTransfer.files[i]);
        }
      }
      axios.post(`/api/workspaces/${workspace}/dms/${id}/images`, formData).then(() => {
        setDragOver(false);
        localStorage.setItem(`${workspace}-${id}`, new Date().getTime().toString());
        mutateChat();
      });
    },
    [workspace, id, mutateChat],
  );

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    console.log(e);
    setDragOver(true);
  }, []);

  if (!userData || !myData) {
    return null;
  }

  //flat() 2차원 배열을 1차원으로 바꿔준다.
  // reverse() 배열의 순서를 반전 시킨다.
  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []); // 섹션별로 분리한 내용,

  return (
    <Container onDrop={onDrop} onDragOver={onDragOver}>
      <Header>
        <img src={gravatar.url(userData.email, {s: '24px', d: 'retro'})} alt={userData.nickname}/>
        <span>{userData.nickname}</span>
      </Header>
      <ChatList
        chatSections={chatSections}
        scrollbarRef={scrollbarRef}
        setSize={setSize}
        isReachingEnd={isReachingEnd}
      />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm}/>
      {dragOver && <DragOver>업로드!</DragOver>}
    </Container>
  )
}

export default DirectMessage