import React, { useState } from 'react';
import { InputGroup, Icon, Modal, Button, Uploader, Alert } from 'rsuite';
import { useModalstate } from '../../../misc/customhooks';
import { storage } from '../../../misc/firebase';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
const MAX_FILE_SIZE = 1000 * 1024 * 5;
const Attach = ({ afterUp }) => {
  const { chatid } = useParams();
  const { open, isopen, close } = useModalstate();
  const [file, setfile] = useState([]);
  const onchange = fileArr => {
    const filtered = fileArr
      .filter(el => el.blobFile.size <= MAX_FILE_SIZE)
      .slice(0, 5);
    setfile(filtered);
  };
  const [load, setload] = useState(false);
  const onSend = async () => {
    try {
      setload(true);
      const up = file.map(f => {
        return storage
          .ref(`/chat/${chatid}`)
          .child(Date.now() + f.name)
          .put(f.blobFile, {
            cacheControl: `public, max-age = ${3600 * 24 * 3}`,
          });
      });

      const uploadp = await Promise.all(up);
      const shapeP = uploadp.map(async snap => {
        return {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL(),
        };
      });
      const f = await Promise.all(shapeP);
      await afterUp(f);
      setload(false);
      setfile([]);
      close();
    } catch (err) {
      setload(false);
      setfile([]);
      Alert.error(err.message, 4000);
    }
  };
  return (
    <div>
      <InputGroup.Button onClick={open}>
        <Icon icon="attachment"></Icon>
      </InputGroup.Button>
      <Modal show={isopen} onHide={close}>
        <Modal.Header>
          <Modal.Title>Upload Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Uploader
            fileList={file}
            autoUpload={false}
            action=""
            onChange={onchange}
            multiple
            listType="picture-text"
            className="w-100"
            disabled={onload}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button block disabled={load} onClick={onSend}>
            Send
          </Button>
          <div className="text-right mt-2">
            <small>* only files less than 5mb are allowed</small>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Attach;
