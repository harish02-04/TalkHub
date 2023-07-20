import React from 'react';
import { Avatar } from 'rsuite';
import { getnameinitials } from '../../misc/helper';
const Profileavatar = ({ name, ...avprops }) => {
  return (
    <Avatar circle {...avprops}>
      {getnameinitials(name)}
    </Avatar>
  );
};

export default Profileavatar;
