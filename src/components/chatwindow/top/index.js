import React, { memo } from 'react';
import { useCurrentRoom } from '../../../context/current-rrom-context';
import { Link } from 'react-router-dom';
import { ButtonToolbar, Icon } from 'rsuite';
import { useMediaQuery } from '../../../misc/customhooks';
import RoomInfo from './RoomInfo';
import EditRoom from './EditRoom';
const Top = () => {
  const name = useCurrentRoom(v => v.name);
  const des = useCurrentRoom(v => v.description);
  const isadmin = useCurrentRoom(v => v.isadmin);
  const isMobile = useMediaQuery('(max-width: 992px)');
  console.log(isMobile);
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-disappear d-flex align-center">
          <Icon
            componentClass={Link}
            to="/"
            icon="arrow-circle-left"
            size="2x"
            className={
              isMobile
                ? 'd-inline-block p-0 mr-2 text-blue link-unstyled'
                : 'd-none'
            }
          ></Icon>
          <span className="text-disappear">{name}</span>
        </h4>
        <ButtonToolbar className="ws-nowrap">
          {isadmin && <EditRoom></EditRoom>}
        </ButtonToolbar>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <span>{des}</span>
        <RoomInfo></RoomInfo>
      </div>
    </div>
  );
};

export default memo(Top);
