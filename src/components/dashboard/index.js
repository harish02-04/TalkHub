import React from 'react';
import { Alert, Button, Divider, Drawer } from 'rsuite';
import { profilefun } from '../../context/profile.context';
import { database } from '../../misc/firebase';
import Editable from '../editable';
import Providerblock from './Providerblock';
import Avatar from './Avatarup';
import { getuserupdate } from '../../misc/helper';
const Dashboard = ({ signout }) => {
  const { profile } = profilefun();
  const onSave = async newdata => {
    try {
      const updates = await getuserupdate(
        profile.id,
        'name',
        newdata,
        database
      );
      console.log('updates' + updates);
      await database.ref().update(updates);
      Alert.info('Updated Successfully', 4000);
    } catch (err) {
      Alert.info(err.message, 4000);
    }
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title></Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3>Hey,{profile.name}</h3>
        <Providerblock></Providerblock>
        <Divider />
        <Editable
          name="nickname"
          initial={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">Nickname</h6>}
        ></Editable>
        <Avatar></Avatar>
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
