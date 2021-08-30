import React from 'react';
import './App.css';
import { Switch, Route} from "react-router-dom"
import {PrivateRoute} from "./utils/PrivateRoute"
import { Login } from './components/views/Login';
import {Main} from "./components/views/Main"
import { Register } from './components/views/Register';
import { PasswordRequest } from './components/views/PasswordRequest';
import { PasswordReset } from "./components/views/PasswordReset"
function App() {
  return (
    <Switch >
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register/>
      </Route>
      <Route path="/passwordrequest">
        <PasswordRequest/>
      </Route>
      <Route path="/resetpassword">
        <PasswordReset/>
      </Route>
      <PrivateRoute path="/main">
        <Main />
      </PrivateRoute>

    </Switch>
  );
}

export default App;
