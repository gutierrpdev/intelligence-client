import React from 'react';
import Iag from './Iag';
import Login from './Login'
import { Route, Switch } from 'react-router-dom';

const App = () => (
    <div className="app-routes">
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Iag} />
    </Switch>
  </div>
  );

export default App;