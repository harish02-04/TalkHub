import React from 'react';
import Profileavatar from '../../dashboard/Profileavatar';
import TimeAgo from 'timeago-react';
import Profilleinfo from './Profilleinfo';

const Msgitem = ({ msg }) => {
  const { author, createdAt, text } = msg;
  return (
    <li className="padded mb-1">
      <div className="d-flex align-items-center font-bolder mb-1">
        <Profileavatar
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="xs"
        ></Profileavatar>

        <Profilleinfo
          profile={author}
          appearance="link"
          className="p-0 ml-1 text-black"
        ></Profilleinfo>
        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-45 ml-2"
        ></TimeAgo>
      </div>
      <div>
        <span className="word-break-all">{text}</span>
      </div>
    </li>
  );
};

export default Msgitem;
