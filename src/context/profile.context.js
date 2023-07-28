import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../misc/firebase';
import firebase from 'firebase/app';
const profilecontext = createContext();
export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};
const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};
export const Profileprovider = ({ children }) => {
  const [profile, setprofile] = useState(null);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    let userRef;
    let userstatusref;
    const authUnSub = auth.onAuthStateChanged(authobj => {
      if (authobj) {
        console.log(authobj.uid);
        userstatusref = database.ref(`/status/${authobj.uid}`);
        userRef = database.ref(`/profiles/${authobj.uid}`);
        userRef.on('value', snap => {
          console.log(snap);
          const { name, createdAt, avatar } = snap.val();
          const data = {
            name,
            createdAt,
            avatar,
            id: authobj.uid,
            email: authobj.email,
          };
          setprofile(data);
          setloading(false);
        });

        database.ref('.info/connected').on('value', snapshot => {
          // If we're not currently connected, don't do anything.
          if (!!snapshot.val() === false) {
            return;
          }

          userstatusref
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(() => {
              userstatusref.set(isOnlineForDatabase);
            });
        });
      } else {
        if (userRef) {
          userRef.off();
        }
        if (userstatusref) {
          userstatusref.off();
        }
        setprofile(null);
        setloading(false);
      }
    });

    return () => {
      authUnSub();
      if (userRef) {
        userRef.off();
      }
      if (userstatusref) {
        userstatusref.off();
      }
    };
  }, []);
  return (
    <profilecontext.Provider value={{ profile, loading }}>
      {children}
    </profilecontext.Provider>
  );
};

// eslint-disable-next-line react-hooks/rules-of-hooks
export const profilefun = () => useContext(profilecontext);
