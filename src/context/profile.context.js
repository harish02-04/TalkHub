import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../misc/firebase';
const profilecontext = createContext();

export const Profileprovider = ({ children }) => {
  const [profile, setprofile] = useState(null);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    let userRef;
    const authUnSub = auth.onAuthStateChanged(authobj => {
      if (authobj) {
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
      } else {
        if (userRef) {
          userRef.off();
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
