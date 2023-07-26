import React from 'react';
import { Col, Grid, Row } from 'rsuite';
import Sidebar from '../../components/sidebar';
import { RoomsProvider } from '../../context/Roomcontext';
import { Switch, Route } from 'react-router';
import Chat from './Chat';
import { useMediaQuery } from '../../misc/customhooks';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom';
const Home = () => {
  const isdesktop = useMediaQuery('(min-width: 992px)');
  const { isExact } = useRouteMatch();

  const render_sidebar = isdesktop || isExact;
  return (
    <RoomsProvider>
      {' '}
      <Grid fluid className="h-100">
        <Row className="h-100">
          {render_sidebar && (
            <Col xs={24} md={8} className="h-100">
              <Sidebar></Sidebar>
            </Col>
          )}
          <Switch>
            <Route exact path="/chat/:chatid">
              <Col xs={24} md={16} className="h-100">
                <Chat />
              </Col>
            </Route>
            <Route>
              {isdesktop && (
                <Col xs={24} md={16} className="h-100">
                  <h6 className="text-center mt-page">Please Select chat</h6>
                </Col>
              )}
            </Route>
          </Switch>
        </Row>
      </Grid>
    </RoomsProvider>
  );
};
export default Home;
