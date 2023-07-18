import React from 'react';
import { Container, Loader } from 'rsuite';
import { profilefun } from '../context/profile.context';
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom';
const PublicRoute = ({ children, ...routeProps }) => {
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
  if (profile && !loading) {
    return <Redirect to="/"></Redirect>;
  }
  return <Route {...routeProps}>{children}</Route>;
};
export default PublicRoute;
