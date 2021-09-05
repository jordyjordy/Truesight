import React from 'react';
import './App.css';
import { Switch, Route} from "react-router-dom"
import {PrivateRoute} from "./utils/PrivateRoute"
import {Main} from "./components/views/Main"
import { Register, Login, PasswordRequest, PasswordReset } from './components/views/Account/';
import { Redirecter } from './components/views/Redirecter';
function App() {
  return (
    <Switch >
      <Route exact path="/">
        <Redirecter />
      </Route>
      <PrivateRoute path="/main">
        <Main/>
      </PrivateRoute>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register/>
      </Route>
      <Route exact path="/passwordrequest">
        <PasswordRequest/>
      </Route>
      <Route exact path="/resetpassword">
        <PasswordReset/>
      </Route>
    </Switch>
  );
}

export default App;
