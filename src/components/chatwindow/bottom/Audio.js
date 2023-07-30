import React, { useCallback, useState } from 'react';
import { Alert, Icon, InputGroup } from 'rsuite';
import { ReactMic } from 'react-mic';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { storage } from '../../../misc/firebase';
const Audio = ({ afterUp }) => {
  const [rec, setrec] = useState(false);
  const [load, setload] = useState(false);
  const { chatid } = useParams();
  const onupload = useCallback(
    async data => {
      setload(true);
      try {
        const snap = await storage
          .ref(`/chat/${chatid}`)
          .child(`audio_${Date.now()}.mp3`)
          .put(data.blob, {
            cacheControl: `public, max-age = ${3600 * 24 * 3}`,
          });
        const file = {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL(),
        };
        setload(false);
        afterUp([file]);
      } catch (err) {
        setload(false);
        Alert.error(err.message, 4000);
      }
    },
    [afterUp, chatid]
  );
  const onclick = useCallback(() => {
    setrec(p => !p);
  }, []);
  return (
    <div>
      <InputGroup.Button
        onClick={onclick}
        disabled={load}
        className={rec ? 'animate-blink' : ''}
      >
        <Icon icon="microphone"></Icon>
        <ReactMic
          record={rec}
          className="d-none"
          onStop={onupload}
          mimeType="audio/mp3"
        ></ReactMic>
      </InputGroup.Button>
    </div>
  );
};

export default Audio;
