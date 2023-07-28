import React from 'react';
import { Alert, Button, Drawer } from 'rsuite';
import { useMediaQuery, useModalstate } from '../../../misc/customhooks';
import Editable from '../../editable';
import { useCurrentRoom } from '../../../context/current-rrom-context';
import { memo } from 'react';
import { database } from '../../../misc/firebase';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
const EditRoom = () => {
  const { isopen, open, close } = useModalstate();
  const { chatid } = useParams();
  const isMobile = useMediaQuery('(max-width : 992px)');
  const name = useCurrentRoom(v => v.name);
  const description = useCurrentRoom(v => v.description);
  const update = (key, value) => {
    database
      .ref(`rooms/${chatid}`)
      .child(key)
      .set(value)
      .then(() => {
        Alert.success('Successfully Updated', 4000);
      })
      .catch(err => {
        Alert.error(err.message, 4000);
      });
  };
  const onNamesave = newname => {
    update('name', newname);
  };
  const onDescriptionSave = newdes => {
    update('description', newdes);
  };

  return (
    <div>
      <Button className="br-circle" size="sm" color="red" onClick={open}>
        A
      </Button>
      <Drawer full={isMobile} show={isopen} onHide={close}>
        <Drawer.Header>
          <Drawer.Title>Edit Room</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <Editable
            initial={name}
            onSave={onNamesave}
            label={<h6 className="mb-2">Name</h6>}
            empty="Name cannot be empty"
          ></Editable>
          <Editable
            componentClass="textarea"
            rows={5}
            initial={description}
            onSave={onDescriptionSave}
            empty="Description cannot be empty"
            wrapper="mt-3"
          ></Editable>
        </Drawer.Body>
        <Drawer.Footer>
          <Button block onClick={close}>
            Close
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};

export default memo(EditRoom);
