import React from 'react';
import { Loader, Nav } from 'rsuite';
import Roomitem from './Roomitem';
import { userooms } from '../../context/Roomcontext';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
const Roomlist = ({ aboveElHeight }) => {
  const location = useLocation();
  const rooms = userooms();
  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${aboveElHeight}px)`,
      }}
      activeKey={location.pathname}
    >
      {!rooms && (
        <Loader
          center
          vertical
          content="loading"
          speed="slow"
          size="md"
        ></Loader>
      )}
      {rooms &&
        rooms.length > 0 &&
        rooms.map(r => (
          <Nav.Item
            componentClass={Link}
            to={`/chat/${r.id}`}
            key={r.id}
            eventKey={`/chat/${r.id}`}
          >
            <Roomitem room={r}></Roomitem>
          </Nav.Item>
        ))}
    </Nav>
  );
};

export default Roomlist;
