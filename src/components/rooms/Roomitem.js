import React from 'react';
import TimeAgo from 'timeago-react';
const Roomitem = ({ room }) => {
  console.log(room + 'v');
  const { createdAt, name } = room;
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-disappear">{name}</h3>
        <TimeAgo
          datetime={new Date(createdAt)}
          className="font-normal text-black-45"
        />
      </div>
      <div className="d-flex align-items-center text-black-70">
        <span>No Messages yet....</span>
      </div>
      <div></div>
    </div>
  );
};

export default Roomitem;