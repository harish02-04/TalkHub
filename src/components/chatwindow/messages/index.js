import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { auth, database } from '../../../misc/firebase';
import { transform } from '../../../misc/helper';
import { useCallback } from 'react';
import Msgitem from './Msgitem';
import { Alert } from 'rsuite';
const Messages = () => {
  const { chatid } = useParams();
  const [msg, setmsg] = useState(null);
  const handlelike = useCallback(async mid => {
    const { uid } = auth.currentUser;

    const msgref = database.ref(`/messages/${mid}`);
    let amsg;
    await msgref.transaction(msg => {
      if (msg) {
        if (msg.likes && msg.likes[uid]) {
          msg.likecount -= 1;
          msg.likes[uid] = null;
          amsg = 'Like removed';
        } else {
          msg.likecount += 1;
          if (!msg.likes) {
            msg.likes = {};
          }
          msg.likes[uid] = true;
          amsg = 'Like Added';
        }
      }
      return msg;
    });
    Alert.info(amsg, 4000);
  }, []);
  const handledelete = useCallback(
    async mid => {
      if (!window.confirm('Delete this message?')) {
        return;
      }
      const update = {};
      const isLast = msg[msg.length - 1].id === mid;
      update[`/messages/${mid}`] = null;
      if (isLast && msg.length > 1) {
        update[`rooms/${chatid}/lastmessage`] = {
          ...msg[msg.length - 2],
          msgid: msg[msg.length - 2].id,
        };
      }

      if (isLast && msg.length === 1) {
        update[`rooms/${chatid}/lastmessage`] = null;
      }

      try {
        await database.ref().update(update);
        Alert.info('Message deleted', 4000);
      } catch (err) {
        Alert.error(err.message, 4000);
      }
    },
    [chatid, msg]
  );

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
          <Msgitem
            key={msg.id}
            msg={msg}
            handleadmin={handleadmin}
            handlelike={handlelike}
            handledelete={handledelete}
          >
            {' '}
          </Msgitem>
        ))}
    </ul>
  );
};

export default Messages;
