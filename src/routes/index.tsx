import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Info from '../pages/Info';
import Main from '../pages/Main';
import Widget from '../pages/Widget';

export default function Routes(): JSX.Element {
  return (
    <Switch>
      <Route component={Main} exact path="/" />
      <Route component={Widget} exact path="/widget" />
      <Route component={Info} exact path="/info:id" />
    </Switch>
  );
}
