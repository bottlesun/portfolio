import React, {useCallback, useState} from "react";
import gravatar from 'gravatar';
import useSWR from "swr";
import axios from "axios";
import loadable from "@loadable/component";
import fetcher from "@utils/fetcher";
import {IChannel, IUser} from "@typings/db";
import {Button, Input, Label} from '@pages/SignUp/styles';
import {useParams} from 'react-router';
import {Link, Redirect, Route, Switch} from "react-router-dom";
import {toast} from 'react-toastify';
import useInput from "@hooks/useInput";
import Modal from '@components/Modal';
import Menu from "@components/Menu";
import InviteWorkspaceModal from "@components/InviteWorkspaceModal";
import InviteChannelModal from "@components/InviteChannelModal";
import CreateChannelModal from '@components/CreateChannelModal';
import DMList from "@components/DMList";
import ChannelList from "@components/ChannelList";

import {
  Header,
  ProfileImg,
  RightMenu,
  Workspaces,
  WorkspaceWrapper,
  Channels,
  Chats,
  WorkspaceName,
  MenuScroll,
  ProfileModal,
  LogOutButton,
  WorkspaceButton,
  AddButton,
  WorkspaceModal,
} from "@layouts/Workspace/styles";

const Channel = loadable(() => import('@pages/Channel'))
const DirectMessage = loadable(() => import('@pages/DirectMessage'))

const Workspace = () => {
  const params = useParams<{ workspace?: string }>();
  // console.log('params', params, 'location', location, 'routeMatch', routeMatch, 'history', history);
  const {workspace} = params;
  const {data: userData, mutate} = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 10000 // 실행 시간 (초) 동안에는 중복으로 호출 되는 부분을 무시하고 막아준다. , 실행 시간이 지난 후 다시 호출 해준다.
    // 'http://localhost:3095/api/users' 주소에 ? 나 #123 을 붙혀 보내도 값이 다르다고 인식하여 , 저장을 다르게 한다.
  });
  const {data: channelData} = useSWR<IChannel[]>(userData ? `/api/workspaces/${workspace}/channels` : null, fetcher);

  const {data: memberData} = useSWR<IUser[]>(userData ? `/api/workspaces/${workspace}/members` : null, fetcher);

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState(false);
  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);
  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('');
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput('');


  const onLogout = useCallback(() => {
    axios
      .post('/api/users/logout', null, {
        withCredentials: true, // 쿠키 공유
      })
      .then(() => {
        mutate(false);
      });
  }, [])

  const onCloseUserProfile = useCallback((e) => {

    e.stopPropagation() // 이벤트 버블링 막아주는 함수 자신요소 클릭 시 부모 요소에게 전달 되는걸 막아준다.
    setShowUserMenu(false)
  }, [])

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev) // 토글 함수
  }, [])

  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal(true);
  }, [])


  const onCreateWorkspace = useCallback(
    (e) => {
      e.preventDefault();
      if (!newWorkspace || !newWorkspace.trim()) {
        return;
      }
      if (!newUrl || !newUrl.trim()) {
        return;
      }
      axios
        .post('/api/workspaces', {
          workspace: newWorkspace,
          url: newUrl,
        })
        .then(() => {
          mutate();
          setShowCreateWorkspaceModal(false);
          setNewWorkspace('');
          setNewUrl('');
        })
        .catch((error) => {
          console.dir(error);
          toast.error(error.response?.data, {position: 'bottom-center'});
        });
    },
    [newWorkspace, newUrl],
  );

  const onCloseModal = useCallback(() => {
    setShowCreateWorkspaceModal(false);
    setShowCreateChannelModal(false);
    setShowInviteWorkspaceModal(false);
  }, []);

  const toggleWorkspaceModal = useCallback(() => {
    setShowWorkspaceModal((prev) => !prev);
  }, []);

  const onClickAddChannel = useCallback(() => {
    setShowCreateChannelModal(true);
  }, []);

  const onClickInviteWorkspace = useCallback(() => {
    setShowInviteWorkspaceModal(true)
  }, [])


  if (userData === undefined) return <div>로딩중</div>;

  if (userData === false) {
    return <Redirect to='/login'/>
  }

  return (
    <div>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg src={gravatar.url(userData.email, {s: '28px', d: 'retro'})} alt={userData.email}/>
            {showUserMenu && (
              <Menu style={{right: 0, top: 38}} show={showUserMenu} onCloseModal={onCloseUserProfile}>
                <ProfileModal>
                  <img src={gravatar.url(userData.nickname, {s: '36px', d: 'retro'})} alt={userData.nickname}/>
                  <div>
                    <span id="profile-name">{userData.nickname}</span>
                    <span id="profile-active">Active</span>
                  </div>
                </ProfileModal>
                <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
              </Menu>
            )}
          </span>
        </RightMenu>
      </Header>

      <WorkspaceWrapper>
        <Workspaces>
          {userData?.Workspaces?.map((ws) => {
            return (
              <Link key={ws.id} to={`/workspace/${ws.url}/channel/일반`}>
                <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
              </Link>
            )
          })}
          <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
        </Workspaces>
        <Channels>
          <WorkspaceName onClick={toggleWorkspaceModal}>Sleact</WorkspaceName>
          <MenuScroll>
            <Menu show={showWorkspaceModal} onCloseModal={toggleWorkspaceModal} style={{top: 95, left: 80}}>
              <WorkspaceModal>
                <h2>Sleact</h2>
                <button onClick={onClickInviteWorkspace}>워크스페이스에 사용자 초대</button>
                <button onClick={onClickAddChannel}>채널 만들기</button>
                <button onClick={onLogout}>로그아웃</button>
              </WorkspaceModal>
            </Menu>
           {/* <ChannelList />*/}
            <DMList/>
          </MenuScroll>
        </Channels>
        <Chats>
          <Switch>
            <Route path='/workspace/:workspace/channel/:channel' component={Channel}/>
            <Route path='/workspace/:workspace/dm/:id' component={DirectMessage}/>
          </Switch>
        </Chats>
      </WorkspaceWrapper>

      <Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>
        <form onSubmit={onCreateWorkspace}>
          <Label id="workspace-label">
            <span>워크스페이스 이름</span>
            <Input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace}/>
          </Label>
          <Label id="workspace-url-label">
            <span>워크스페이스 url</span>
            <Input id="workspace-url" value={newUrl} onChange={onChangeNewUrl}/>
          </Label>
          <Button type="submit">생성하기</Button>
        </form>
      </Modal>

      <CreateChannelModal
        show={showCreateChannelModal}
        onCloseModal={onCloseModal}
        setShowCreateChannelModal={setShowCreateChannelModal}
      />
      <InviteWorkspaceModal
        show={showInviteWorkspaceModal}
        onCloseModal={onCloseModal}
        setShowInviteWorkspaceModal={setShowInviteWorkspaceModal}
      />
      <InviteChannelModal
        show={showInviteChannelModal}
        onCloseModal={onCloseModal}
        setShowInviteChannelModal={setShowInviteChannelModal}
      />
    </div>
  )
}

export default Workspace;