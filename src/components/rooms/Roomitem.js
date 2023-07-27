import React from 'react';
import TimeAgo from 'timeago-react';
import Profileavatar from '../dashboard/Profileavatar';
const Roomitem = ({ room }) => {
  console.log(room + 'v');
  const { createdAt, name, lastmessage } = room;
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-disappear">{name}</h3>
        <TimeAgo
          datetime={
            lastmessage ? new Date(lastmessage.createdAt) : new Date(createdAt)
          }
          className="font-normal text-black-45"
        />
      </div>
      <div className="d-flex align-items-center text-black-70">
        {lastmessage ? (
          <>
            <div className="d-flex align-items-center">
              <Profileavatar
                src={lastmessage.author.avatar}
                name={lastmessage.author.name}
                size="sm"
              ></Profileavatar>
            </div>
            <div className="text-disappear ml-2">
              <div className="italic">{lastmessage.author.name}</div>
              <span>{lastmessage.text}</span>
            </div>
          </>
        ) : (
          <span>No Messages yet....</span>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Roomitem;
