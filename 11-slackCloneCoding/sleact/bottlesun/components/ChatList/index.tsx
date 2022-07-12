import React, {FC, useCallback, useRef, forwardRef, RefObject, MutableRefObject} from "react";
import {ChatZone, Section, StickyHeader} from "@components/ChatList/styles";
import {IDM, IChat} from '@typings/db';
import Chat from "@components/Chat";
import {Scrollbars} from 'react-custom-scrollbars';

interface Props {
  scrollbarRef: RefObject<Scrollbars>;
  chatSections: { [key: string]: (IDM | IChat)[] },
  setSize: (f: (index: number) => number) => Promise<(IDM | IChat)[][] | undefined>;
  isReachingEnd?: boolean;
}

// forwardRef : 상위 컴포넌트의 Ref 를 하위 컴포넌트로 전달 해주는 기능

const ChatList = forwardRef<Scrollbars, Props>(({chatSections, setSize, isReachingEnd}, scrollRef) => {
  const onScroll = useCallback((values) => {
    if (values.scrollTop === 0 && !isReachingEnd) {
      console.log('가장 위');
      // 데이터 추가 로딩
      setSize((prevSize) => prevSize + 1)
        .then(() => {
          // 스크롤 위치 유지
          const current = (scrollRef as MutableRefObject<Scrollbars>)?.current;
          if (current) {
            current.scrollTop(current.getScrollHeight() - values.scrollHeight);
          }
          // ref.current?.getScrollHeight() 현재 스크롤 높이 - values.scrollHeight 스크롤 바 스크롤 높이
        });
    }
  }, []);

  return (
    <ChatZone>
      <Scrollbars autoHide ref={scrollRef} onScrollFrame={onScroll}>
        {Object.entries(chatSections).map(([date, chats]) => { // Object.entries(objectName) 객체를 반복문 돌때 사용 , 객체가 배열로 바뀜
          return (
            <Section className={`section-${date}`} key={date}>
              <StickyHeader> {/* position sticky  - fixed 처럼 따라오다 상단에 붙어 버린다.*/}
                <button>{date}</button>
              </StickyHeader>
              {chats.map((chat) => (
                <Chat key={chat.id} data={chat}/>
              ))}
            </Section>
          );
        })}
      </Scrollbars>
    </ChatZone>
  )
})

export default ChatList;