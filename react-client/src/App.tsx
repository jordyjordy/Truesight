import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import {PrivateRoute} from "./utils/PrivateRoute"
import { Login } from './components/views/Login';
import {Main} from "./components/views/Main"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <PrivateRoute path="/main">
          <Main />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
