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
import { useHover } from '@uidotdev/usehooks';
import IconBtnControl from './IconBtnControl';
import { useMediaQuery } from '../../../misc/customhooks';
const Msgitem = ({ msg, handleadmin, handlelike, handledelete }) => {
  const { author, createdAt, text, likes, likecount } = msg;
  const [ref, ishover] = useHover();
  const isadmin = useCurrentRoom(v => v.isadmin);
  const admins = useCurrentRoom(v => v.admins);
  const ismsgauthoradmin = admins.includes(author.uid);
  const isauthor = auth.currentUser.uid === author.uid;
  const Canaccess = isadmin && !isauthor;
  const isliked = likes && Object.keys(likes).includes(auth.currentUser.uid);
  const ismobile = useMediaQuery('(max-width:992px)');
  const canshow = ismobile || ishover;
  return (
    <li
      className={`padded mb-1 cursor-pointer ${ishover ? 'bg-black-02' : ''}`}
      ref={ref}
    >
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
        <IconBtnControl
          // eslint-disable-next-line no-constant-condition
          {...(isliked ? { color: 'red' } : {})}
          isVisible={canshow}
          IconName="heart"
          tooltip="Like this message"
          onClick={() => handlelike(msg.id)}
          badgeContent={likecount}
        ></IconBtnControl>
        {isauthor && (
          <IconBtnControl
            isVisible={canshow}
            IconName="close"
            tooltip="Delete this message"
            onClick={() => handledelete(msg.id)}
          ></IconBtnControl>
        )}
      </div>
      <div>
        <span className="word-break-all">{text}</span>
      </div>
    </li>
  );
};

export default memo(Msgitem);
