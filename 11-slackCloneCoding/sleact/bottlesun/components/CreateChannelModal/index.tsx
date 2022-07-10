import React, {useCallback} from "react";
import Modal from "@components/Modal";
import {Button, Input, Label} from "@pages/SignUp/styles";
import useInput from "@hooks/useInput";
import axios from "axios";
import {useParams} from 'react-router';
import {toast} from "react-toastify";
import useSWR from "swr";
import {IChannel, IUser} from "@typings/db";
import fetcher from "@utils/fetcher";

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowCreateChannelModal: (flag: boolean) => void
}

const CreateChannelModal: React.FC<Props> = ({show, onCloseModal, setShowCreateChannelModal}) => {
  const [newChannel, onChangeNewChannel, setNewChannel] = useInput('');
  const params = useParams<{ workspace?: string }>();
  const {workspace} = params;

  const {data: userData, mutate} = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 1000
  });
  const { data: channelData ,mutate : channelMutate } = useSWR<IChannel[]>(userData ? `/api/workspaces/${workspace}/channels` : null, fetcher);


  const onCreateChannel = useCallback((e) => {
    e.preventDefault()
    axios.post(`/api/workspaces/${workspace}/channels`, {
      name: newChannel
    }, {
      withCredentials: true
    })
      .then(() => {
        channelMutate();
        setShowCreateChannelModal(false);
        setNewChannel('');
      })
      .catch((error) => {
        console.dir(error)
        toast.error(error.response?.data, {position: 'bottom-center'});
      })
  }, [newChannel])


  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onCreateChannel}>
        <Label id="channel-label">
          <span>채널</span>
          <Input id="channel" value={newChannel} onChange={onChangeNewChannel}/>
          <Button type="submit">생성하기</Button>
        </Label>
      </form>
    </Modal>
  )
}
export default CreateChannelModal;