import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { InputGroup, Input, Icon, Alert } from 'rsuite';
import { useParams } from 'react-router';
import firebase from 'firebase/app';
import { profilefun } from '../../../context/profile.context';
import { database } from '../../../misc/firebase';
function assembleMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.id,
      createdAt: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {}),
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    likecount: 0,
  };
}
const Bottom = () => {
  const [inp, setinp] = useState('');
  const { chatid } = useParams();
  const { profile } = profilefun();
  const [load, setload] = useState(false);
  const onInputChange = useCallback(value => {
    setinp(value);
  }, []);

  const onsendclick = async () => {
    if (inp.trim() === '') {
      return;
    }
    const msgdata = assembleMessage(profile, chatid);
    msgdata.text = inp;
    const updates = {};
    const messid = database.ref('messages').push().key;
    updates[`/messages/${messid}`] = msgdata;
    updates[`/rooms/${chatid}/lastmessage`] = {
      ...msgdata,
      msgId: messid,
    };
    setload(true);
    try {
      await database.ref().update(updates);
      setinp('');
      setload(false);
    } catch (err) {
      Alert.error('Error occured', 4000);
      setload(false);
    }
  };
  const onkeydown = ev => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      onsendclick();
    }
  };
  return (
    <div>
      <InputGroup>
        <Input
          placeholder="Say Hi!"
          value={inp}
          onChange={onInputChange}
          onKeyDown={onkeydown}
        ></Input>
        <InputGroup.Button
          color="green"
          appearance="primary"
          onClick={onsendclick}
          disabled={load}
        >
          <Icon icon="send"></Icon>
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default Bottom;
