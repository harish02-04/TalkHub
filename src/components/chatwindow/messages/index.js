import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { database } from '../../../misc/firebase';
import { transform } from '../../../misc/helper';
import { useCallback } from 'react';
import Msgitem from './Msgitem';
import { Alert } from 'rsuite';
const Messages = () => {
  const { chatid } = useParams();
  const [msg, setmsg] = useState(null);
  const ischatemp = msg && msg.length === 0;
  const canshow = msg && msg.length > 0;
  let amsg;
  const handleadmin = useCallback(
    async uid => {
      const adminref = database.ref(`rooms/${chatid}/admins`);
      await adminref.transaction(admins => {
        if (admins) {
          if (admins[uid]) {
            admins[uid] = null;
            amsg = 'Admin permission removed';
          } else {
            admins[uid] = true;
            amsg = 'Admin permission granted';
          }
        }
        return admins;
      });
      Alert.info(amsg, 4000);
    },
    [chatid]
  );
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
          <Msgitem key={msg.id} msg={msg} handleadmin={handleadmin}>
            {' '}
          </Msgitem>
        ))}
    </ul>
  );
};

export default Messages;
