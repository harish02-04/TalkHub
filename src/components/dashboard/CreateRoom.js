import React, { useState, useCallback, useRef } from 'react';
import firebase from 'firebase/app';
import { auth, database } from '../../misc/firebase';
import {
  Alert,
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Modal,
  Schema,
} from 'rsuite';
import { useModalstate } from '../../misc/customhooks';
const initial = {
  name: '',
  description: '',
};
const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('Name is required'),
  description: StringType().isRequired('Description is required'),
});
const CreateRoom = () => {
  const { isopen, open, close } = useModalstate();
  const [fs, setfs] = useState(initial);
  const [load, setload] = useState(false);
  const fref = useRef();

  const onFormChange = useCallback(value => {
    setfs(value);
  }, []);

  const onsubmit = async () => {
    if (!fref.current.check()) {
      return;
    }
    setload(true);
    const newdata = {
      ...fs,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      admins: {
        [auth.currentUser.uid]: true,
      },
    };
    try {
      await database.ref('rooms').push(newdata);
      Alert.info(`${fs.name}-Room Created successfully`, 4000);
      setload(false);
      setfs(initial);
      close();
    } catch (err) {
      setload(false);
      Alert.info('Error Occured', 4000);
    }
  };

  return (
    <div className="mt-2">
      <Button block color="green" onClick={open}>
        <Icon icon="creative"></Icon>Create ChatRoom
      </Button>
      <Modal show={isopen} onHide={close}>
        <Modal.Title>New ChatRoom</Modal.Title>
        <Modal.Body>
          <Form
            fluid
            onChange={onFormChange}
            formValue={fs}
            model={model}
            ref={fref}
          >
            <FormGroup>
              <ControlLabel>ChatRoom Name</ControlLabel>
              <FormControl
                name="name"
                placeholder="Enter the room name"
              ></FormControl>
            </FormGroup>

            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows={5}
                name="description"
                placeholder="Give description"
              ></FormControl>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button block appearance="primary" onClick={onsubmit} disabled={load}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoom;
