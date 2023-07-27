import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { database } from '../../../misc/firebase';
import { transform } from '../../../misc/helper';
import Msgitem from './Msgitem';
const Messages = () => {
  const { chatid } = useParams();
  const [msg, setmsg] = useState(null);
  const ischatemp = msg && msg.length === 0;
  const canshow = msg && msg.length > 0;

  useEffect(() => {
    const mref = database.ref('/messages');
    mref
      .orderByChild('roomId')
      .equalTo(chatid)
      .on('value', snap => {
        const data = transform(snap.val());
        setmsg(data);
      });

    return () => {
      mref.off('value');
    };
  }, [chatid]);
  return (
    <ul className="msg-list custom-scroll">
      {ischatemp && <li>No messages yet</li>}
      {canshow &&
        msg.map(msg => (
          <Msgitem key={msg.id} msg={msg}>
            {' '}
          </Msgitem>
        ))}
    </ul>
  );
};

export default Messages;
