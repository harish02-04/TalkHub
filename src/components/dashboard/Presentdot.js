import React from 'react';
import { usePresence } from '../../misc/customhooks';
import { Whisper, Tooltip, Badge } from 'rsuite';

const getcolor = p => {
  if (!p) {
    return 'gray';
  }
  switch (p.state) {
    case 'online':
      return 'green';
    case 'offline':
      return 'red';
    default:
      return 'gray';
  }
};

const getText = p => {
  if (!p) {
    return 'Unknown state';
  }
  return p.state === 'online'
    ? 'Online'
    : `Last online ${new Date(p.last_changed).toLocaleDateString()}`;
};
const Presentdot = ({ uid }) => {
  const present = usePresence(uid);
  return (
    <Whisper
      placement="top"
      controlId="control-id-hover"
      trigger="hover"
      speaker={<Tooltip>{getText(present)}</Tooltip>}
    >
      <Badge
        className="cursor-pointer"
        style={{ backgroundColor: getcolor(present) }}
      ></Badge>
    </Whisper>
  );
};

export default Presentdot;
