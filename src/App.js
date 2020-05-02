import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Iag from './components/Iag';
import Login from './components/Login'

function App() {
  return (
    <div className="app-routes">
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Iag} />
    </Switch>
  </div>
  );
}

export default App;
