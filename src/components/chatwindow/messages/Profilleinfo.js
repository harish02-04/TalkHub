import React from 'react';
import { Button, Modal } from 'rsuite';
import { useMediaQuery, useModalstate } from '../../../misc/customhooks';
import Profileavatar from '../../dashboard/Profileavatar';

const Profilleinfo = ({ profile, ...props }) => {
  const { open, isopen, close } = useModalstate();
  const sname = profile.name.split(' ')[0];
  const d = new Date(profile.createdAt).toLocaleDateString();
  return (
    <div>
      <Button {...props} onClick={open}>
        {sname}
      </Button>
      <Modal show={isopen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{sname} profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Profileavatar
            src={profile.avatar}
            name={profile.name}
            className="width-200 height-200 img-fullsize"
          ></Profileavatar>
          <h4 className="mt-2">{profile.name}</h4>
          <p>Member since {d}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button block onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profilleinfo;
