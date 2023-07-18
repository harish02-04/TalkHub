import React from 'react';
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom';
import { profilefun } from '../context/profile.context';
import { Container, Loader } from 'rsuite';
const PrivateRoute = ({ children, ...routeProps }) => {
  const { profile, loading } = profilefun();
  if (loading && !profile) {
    return (
      <Container>
        <Loader
          center
          vertical
          size="md"
          content="Loading"
          speed="slow"
        ></Loader>
      </Container>
    );
  }
  if (!profile && !loading) {
    return <Redirect to="/signin"></Redirect>;
  }
  return <Route {...routeProps}>{children}</Route>;
};
export default PrivateRoute;
