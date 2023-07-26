import React, { memo } from 'react';
import { useCurrentRoom } from '../../../context/current-rrom-context';
import { Button, Modal } from 'rsuite';
import { useModalstate } from '../../../misc/customhooks';

const RoomInfo = () => {
  const { isopen, open, close } = useModalstate();
  const description = useCurrentRoom(v => v.description);
  const name = useCurrentRoom(v => v.name);
  return (
    <>
      <Button appearance="link" className="px-0" onClick={open}>
        Room Information
      </Button>
      <Modal show={isopen} onHide={close}>
        <Modal.Header>
          <Modal.Title>About {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="mb-1">Description</h6>
          <p>{description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button block onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo(RoomInfo);
