import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { auth, database, storage } from '../../../misc/firebase';
import { groupBy, transform } from '../../../misc/helper';
import { useCallback } from 'react';
import Msgitem from './Msgitem';
import { Alert, Button } from 'rsuite';
const MAX_SIZE = 15;
const mref = database.ref('/messages');
function stb(node, t = 30) {
  const percent =
    (100 * node.scrollTop) / (node.scrollHeight - node.clientHeight) || 0;
  return percent > t;
}
const Messages = () => {
  const { chatid } = useParams();
  const [msg, setmsg] = useState(null);
  const [limit, setlimit] = useState(MAX_SIZE);
  const selfref = useRef();
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
    async (mid, file) => {
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
        return Alert.error(err.message, 4000);
      }
      if (file) {
        try {
          const fileRef = await storage.refFromURL(file.url);
          await fileRef.delete();
        } catch (err) {
          Alert.error(err.message, 4000);
        }
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
  const loadmessages = useCallback(
    limitlast => {
      const node = selfref.current;
      mref.off();
      mref
        .orderByChild('roomId')
        .equalTo(chatid)
        .limitToLast(limitlast || MAX_SIZE)
        .on('value', snap => {
          const data = transform(snap.val());
          setmsg(data);

          if (stb(node)) {
            node.scrollTop = node.scrollHeight;
          }
        });
      setlimit(p => p + MAX_SIZE);
    },
    [chatid]
  );
  const onloadmore = useCallback(() => {
    const node = selfref.current;
    const old = node.scrollHeight;
    loadmessages(limit);
    setTimeout(() => {
      const newH = node.scrollHeight;
      node.scrollTop = newH - old;
    }, 1000);
  }, [loadmessages, limit]);
  useEffect(() => {
    const node = selfref.current;
    loadmessages();
    setTimeout(() => {
      node.scrollTop = node.scrollHeight;
    }, 1000);

    return () => {
      mref.off('value');
    };
  }, [loadmessages]);

  const renderMessage = () => {
    const grps = groupBy(msg, item => new Date(item.createdAt).toDateString());
    const items = [];
    Object.keys(grps).forEach(date => {
      items.push(
        <li key={date} className="text-center mb-1 padded">
          {date}
        </li>
      );
      const msgs = grps[date].map(msg => (
        <Msgitem
          key={msg.id}
          msg={msg}
          handleadmin={handleadmin}
          handlelike={handlelike}
          handledelete={handledelete}
        />
      ));
      items.push(...msgs);
    });
    return items;
  };
  return (
    <ul ref={selfref} className="msg-list custom-scroll">
      {msg && msg.length >= MAX_SIZE && (
        <li className="text-center mt-2 mb-2">
          <Button onClick={onloadmore} color="green">
            LoadMore
          </Button>
        </li>
      )}
      {ischatemp && <li>No messages yet</li>}
      {canshow && renderMessage()}
    </ul>
  );
};

export default Messages;
