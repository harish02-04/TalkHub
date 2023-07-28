import React from 'react';
import Profileavatar from '../../dashboard/Profileavatar';
import TimeAgo from 'timeago-react';
import Profilleinfo from './Profilleinfo';
import Presentdot from '../../dashboard/Presentdot';
import { auth, database } from '../../../misc/firebase';
import { Alert, Button } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-rrom-context';
import { memo } from 'react';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
const Msgitem = ({ msg, handleadmin }) => {
  const { author, createdAt, text } = msg;
  const isadmin = useCurrentRoom(v => v.isadmin);
  const admins = useCurrentRoom(v => v.admins);
  const ismsgauthoradmin = admins.includes(author.uid);
  const isauthor = auth.currentUser.uid === author.uid;
  const Canaccess = isadmin && !isauthor;
  return (
    <li className="padded mb-1">
      <div className="d-flex align-items-center font-bolder mb-1">
        <Presentdot uid={author.uid}></Presentdot>
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
        >
          {Canaccess && (
            <Button block onClick={() => handleadmin(author.uid)} color="blue">
              {ismsgauthoradmin
                ? 'Remove admin permission'
                : 'Give admin in this room'}
            </Button>
          )}
        </Profilleinfo>
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

export default memo(Msgitem);
