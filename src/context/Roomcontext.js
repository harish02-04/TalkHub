import { createContext, useContext, useEffect, useState } from 'react';
import { database } from '../misc/firebase';
import { transform } from '../misc/helper';

const RoomContext = createContext();
export const RoomsProvider = ({ children }) => {
  const [rooms, setrooms] = useState(null);
  useEffect(() => {
    const roomref = database.ref('rooms');
    roomref.on('value', snap => {
      const data = transform(snap.val());
      setrooms(data);
    });
    return () => {
      roomref.off();
    };
  }, []);
  // eslint-disable-next-line react/react-in-jsx-scope
  return <RoomContext.Provider value={rooms}>{children}</RoomContext.Provider>;
};
// eslint-disable-next-line react-hooks/rules-of-hooks
export const userooms = () => useContext(RoomContext);
