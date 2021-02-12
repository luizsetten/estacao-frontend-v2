import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Main from '../pages/Main';
import Widget from '../pages/Widget';
import Info from '../pages/Info';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/widget" component={Widget} />
      <Route exact path="/info:id" component={Info} />
    </Switch>
  );
}
