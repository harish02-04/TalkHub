import React, { useCallback } from 'react';
import { Alert, Button, Divider, Drawer } from 'rsuite';
import { profilefun } from '../../context/profile.context';
import { auth, database } from '../../misc/firebase';
import Editable from '../editable';
const Dashboard = ({ signout }) => {
  const { profile } = profilefun();
  const onSave = async newdata => {
    const namefield = database.ref(`/profiles/${profile.id}`).child('name');
    try {
      await namefield.set(newdata);
      Alert.info('Updated Successfully', 4000);
    } catch (err) {
      Alert.info('Error Occurred', 4000);
    }
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title></Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3>Hey,{profile.name}</h3>
        <Divider />
        <Editable
          name="nickname"
          initial={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">Nickname</h6>}
        ></Editable>
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" onClick={signout}>
          SignOut
        </Button>
      </Drawer.Footer>
    </>
  );
};
export default Dashboard;
