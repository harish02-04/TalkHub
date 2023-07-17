import React from 'react';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './styles/main.scss';
import 'rsuite/dist/styles/rsuite-default.css';
import SignIn from './Pages/signin';
import PrivateRoute from './components/private';
import Home from './Pages/home';
import PublicRoute from './components/publicroute';
function App() {
  return (
    <Switch>
      <PublicRoute path="/signin">
        <SignIn></SignIn>
      </PublicRoute>
      <PrivateRoute path="/">
        <Home></Home>
      </PrivateRoute>
    </Switch>
  );
}

export default App;
