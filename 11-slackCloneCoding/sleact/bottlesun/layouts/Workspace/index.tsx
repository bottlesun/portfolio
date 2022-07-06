import {
  Header,
  ProfileImg,
  RightMenu,
  Workspaces,
  WorkspaceWrapper,
  Channels,
  Chats,
  WorkspaceName, MenuScroll, ProfileModal, LogOutButton
} from "@layouts/Workspace/styles";
import React, {FC, useCallback, useState} from "react";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import axios from "axios";
import {Redirect, Route, Switch} from "react-router-dom";
import gravatar from 'gravatar';
import loadable from "@loadable/component";
import Menu from "@components/Menu";

const Channel = loadable(() => import('@pages/Channel'))
const DirectMessage = loadable(() => import('@pages/DirectMessage'))

const Workspace: FC = ({children}) => {
  const {data, mutate} = useSWR('http://localhost:3095/api/users', fetcher, {
    dedupingInterval: 1000 // 실행 시간 (초) 동안에는 중복으로 호출 되는 부분을 무시하고 막아준다. , 실행 시간이 지난 후 다시 호출 해준다.
    // 'http://localhost:3095/api/users' 주소에 ? 나 #123 을 붙혀 보내도 값이 다르다고 인식하여 , 저장을 다르게 한다.
  });
  const [showUserMenu, setShowUserMenu] = useState(false);


  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true, // 쿠키 공유
      })
      .then(() => {
        mutate(false);
      });
  }, [])

  console.log(`Workspace ->`, data)

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev) // 토글 함수
  }, [])

  if (data === undefined) return <div>로딩중</div>;


  if (data === false) {
    return <Redirect to='/login'/>
  }
  return (
    <div>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg src={gravatar.url(data.email, {s: '28px', d: 'retro'})} alt={data.email}/>
            {showUserMenu && (
              <Menu style={{right: 0, top: 38}} show={showUserMenu} onCloseModal={onClickUserProfile}>
                <ProfileModal>
                  <img src={gravatar.url(data.nickname, {s: '36px', d: 'retro'})} alt={data.nickname}/>
                  <div>
                    <span id="profile-name">{data.nickname}</span>
                    <span id="profile-active">Active</span>
                  </div>
                </ProfileModal>
                <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
              </Menu>
            )}
          </span>
        </RightMenu>
      </Header>
      <button onClick={onLogout}>로그아웃</button>
      <WorkspaceWrapper>
        <Workspaces>test</Workspaces>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>
            MenuScroll
          </MenuScroll>
        </Channels>
        <Chats>
          <Switch>
            {/*{ Route 안에서 Switch Route 를 또 사용 할땐 path 부분 주소를 통일 시켜줘야 한다. 주소가 계층적이여야 함 }*/}
            <Route path='/workspace/channel' component={Channel}/>
            <Route path='/workspace/dm' component={DirectMessage}/>
          </Switch>
        </Chats>
      </WorkspaceWrapper>

    </div>
  )
}

export default Workspace;