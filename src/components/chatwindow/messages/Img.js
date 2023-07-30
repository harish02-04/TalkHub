import React from 'react';
import { Input, Modal } from 'rsuite';
import { useModalstate } from '../../../misc/customhooks';

const Img = ({ src, filename }) => {
  const { open, isopen, close } = useModalstate();
  return (
    <>
      <input
        type="image"
        alt="file"
        src={src}
        onClick={open}
        className="mh-100 mw-100 w-auto"
      ></input>
      <Modal show={isopen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{filename}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <img src={src} height="200%" width="100%" alt="file"></img>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <a href={src} target="blank" rel="noopener noreferrer">
            View Orginal
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Img;
