import React from 'react';
import { Alert, Button, Drawer, Icon } from 'rsuite';
import { useMediaQuery, useModalstate } from '../../misc/customhooks';
import { auth, database } from '../../misc/firebase';
import { useCallback } from 'react';
import Dashboard from '.';
import { isOfflineForDatabase } from '../../context/profile.context';
const DashboardToggle = () => {
  const { isopen, open, close } = useModalstate();
  const signOut = useCallback(() => {
    database
      .ref(`/status/${auth.currentUser.uid}`)
      .set(isOfflineForDatabase)
      .then(() => {
        auth.signOut();
        Alert.info('Signed Out', 4000);
        close();
      })
      .catch(err => {
        Alert.info(err.message, 4000);
      });
  }, [close]);
  const ismob = useMediaQuery('(max-width:992px)');
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard"></Icon>Dashboard
      </Button>
      <Drawer full={ismob} show={isopen} onHide={close} placement="left">
        <Dashboard signout={signOut}></Dashboard>
      </Drawer>
    </>
  );
};
export default DashboardToggle;
