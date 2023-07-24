import React, { useEffect, useRef, useState } from 'react';
import DashboardToggle from './dashboard/Dashboardtoggle';
import CreateRoom from './dashboard/CreateRoom';
import { Divider } from 'rsuite';
import Roomlist from './rooms/Roomlist';
const Sidebar = () => {
  const topref = useRef();
  const [height, setheight] = useState(0);
  useEffect(() => {
    if (topref.current) {
      setheight(topref.current.scrollHeight);
    }
  }, [topref]);
  return (
    <div className="h-100 pt-2">
      <div ref={topref}>
        <DashboardToggle></DashboardToggle>
        <CreateRoom></CreateRoom>
        <Divider>Join Conversation</Divider>
      </div>
      <Roomlist aboveElHeight={height}></Roomlist>
    </div>
  );
};
export default Sidebar;
