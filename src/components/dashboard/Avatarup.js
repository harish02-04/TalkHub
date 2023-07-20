import React, { useState, useRef } from 'react';
import { Alert, Button, Modal } from 'rsuite';
import AvatarEditor from 'react-avatar-editor';
import { useModalstate } from '../../misc/customhooks';
import { storage, database } from '../../misc/firebase';
import { profilefun } from '../../context/profile.context';
import Profileavatar from './Profileavatar';
const Avatar = () => {
  const Fileinptypes = '.png, .jpeg, .jpg';
  const avatarimg = useRef();
  const { profile } = profilefun();
  const { isopen, open, close } = useModalstate();
  const [img, setimg] = useState(null);
  const [isload, setload] = useState(false);
  const acceptypes = ['image/png', 'image/jpeg', 'image/pjpeg'];
  const isvalid = f => acceptypes.includes(f);
  const fileinpchange = ev => {
    const files = ev.target.files;
    if (files.length === 1) {
      const f1 = files[0];
      if (isvalid(f1.type)) {
        setimg(f1);
        open();
      } else {
        Alert.warning('Wrong file Type', 4000);
      }
    }
  };
  const getblob = canvas => {
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('File process error'));
        }
      });
    });
  };
  const upload = async () => {
    const canvas = avatarimg.current.getImageScaledToCanvas();
    setload(true);
    try {
      const blob = await getblob(canvas);
      const refer = storage.ref(`/profile/${profile.id}`).child('avatar');
      const uploadres = await refer.put(blob, {
        cacheControl: `public,max-age=${3600 * 24 * 3}`,
      });
      const downurl = await uploadres.ref.getDownloadURL();
      const userAvatarref = database
        .ref(`/profiles/${profile.id}`)
        .child('avatar');
      userAvatarref.set(downurl);
      setload(false);
      Alert.info('Avatar has been uploaded', 4000);
    } catch (err) {
      setload(true);
      Alert.info(err.message, 4000);
    }
  };
  return (
    <div className="mt-3 text-center">
      <Profileavatar
        src={profile.avatar}
        name={profile.name}
        className="width-200 height-200 img-fullsize"
      ></Profileavatar>
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Select new Avatar
          <input
            id="avatar-upload"
            type="file"
            className="d-none"
            accept={Fileinptypes}
            onChange={fileinpchange}
          />
        </label>
        <Modal show={isopen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Adjust and Upload the Avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {img && (
              <div className="d-flex justify-content-center align-items-center h-100">
                <AvatarEditor
                  ref={avatarimg}
                  image={img}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                />
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button block appearance="ghost" onClick={upload} disabled={isload}>
              Upload new Avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Avatar;
