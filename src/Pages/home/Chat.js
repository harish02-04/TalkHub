import React from 'react';
import Top from '../../components/chatwindow/top';
import Messages from '../../components/chatwindow/messages';
import Bottom from '../../components/chatwindow/bottom';
import { useParams } from 'react-router';
import { userooms } from '../../context/Roomcontext';
import { Loader } from 'rsuite';
import { CurrentRoomProvider } from '../../context/current-rrom-context';
import { transformToarr } from '../../misc/helper';
import { auth } from '../../misc/firebase';
const Chat = () => {
  const { chatid } = useParams();
  const rooms = userooms();
  if (!rooms) {
    <Loader center vertical size="md" content="Loading" speed="slow"></Loader>;
  }

  const croom = rooms.find(room => room.id === chatid);
  if (!croom) {
    return <h6 className="text-center mt-page">Room Not Found</h6>;
  }
  const { name, description } = croom;
  const admins = transformToarr(croom.admins);
  const isadmin = admins.includes(auth.currentUser.uid);
  const croomdata = {
    name,
    description,
    admins,
    isadmin,
  };

  return (
    <CurrentRoomProvider data={croomdata}>
      <div className="chat-top">
        <Top></Top>
      </div>
      <div className="chat-middle">
        <Messages></Messages>
      </div>
      <div className="chat-bottom">
        <Bottom></Bottom>
      </div>
    </CurrentRoomProvider>
  );
};

export default Chat;
