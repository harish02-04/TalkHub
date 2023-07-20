import React, { useState } from 'react';
import { auth } from '../../misc/firebase';
import firebase from 'firebase/app';
import { Tag, Icon, Button, Alert } from 'rsuite';
const Providerblock = () => {
  const [isconnected, setisconnected] = useState({
    'google.com': auth.currentUser.providerData.some(
      data => data.providerId === 'google.com'
    ),
    'facebook.com': auth.currentUser.providerData.some(
      data => data.providerId === 'facebook.com'
    ),
  });
  const updateisconnected = (providerId, value) => {
    setisconnected(p => {
      return {
        ...p,
        [providerId]: value,
      };
    });
  };
  const unlink = async providerId => {
    try {
      if (auth.currentUser.providerData.length === 1) {
        throw new Error('You cannot disconnect Now');
      }
      await auth.currentUser.unlink(providerId);
      updateisconnected(providerId, false);
      Alert.info(`Disconnected from ${providerId}`);
    } catch (err) {
      Alert.info(err.message, 4000);
    }
  };
  const unlinkfb = () => {
    unlink('facebook.com');
  };
  const unlinkggl = () => {
    unlink('google.com');
  };
  const link = async provider => {
    try {
      await auth.currentUser.linkWithPopup(provider);
      Alert.info(`Linked into ${provider.providerId}`, 4000);
      updateisconnected(provider.providerId, true);
    } catch (err) {
      Alert.info('Error Occured');
    }
  };
  const linkfb = () => {
    link(new firebase.auth.FacebookAuthProvider());
  };
  const linkggl = () => {
    link(new firebase.auth.GoogleAuthProvider());
  };
  console.log('ad');
  return (
    <div>
      {isconnected['google.com'] && (
        <Tag color="green" closable onClose={unlinkfb}>
          <Icon icon="google" />
          Connected
        </Tag>
      )}
      {isconnected['facebook.com'] && (
        <Tag color="blue" closable onClose={unlinkggl}>
          <Icon icon="facebook" />
          Connected
        </Tag>
      )}
      <div className="mt-2">
        {!isconnected['google.com'] && (
          <Button block color="green" onClick={linkfb}>
            <Icon icon="google" />
            Link to google
          </Button>
        )}
        {!isconnected['facebook.com'] && (
          <Button block color="blue" onClick={linkggl}>
            <Icon icon="facebook" />
            Link to Facebook
          </Button>
        )}
      </div>
    </div>
  );
};

export default Providerblock;
