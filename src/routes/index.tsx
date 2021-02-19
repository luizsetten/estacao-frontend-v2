import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Info from '../pages/Info';
import Main from '../pages/Main';
import Widget from '../pages/Widget';

interface Station {
  name: string,
  secure_id: string,
  city: string,
  uf: string,
  latitude: number,
  longitude: number
}

export default function Routes(): JSX.Element {
  const [station, setStation] = useState<Station>({
    name: '',
    secure_id: '',
    city: '',
    uf: '',
    latitude: 0,
    longitude: 0
  });

  return (
    <Switch>
      <Route component={() => <Main
      setStation={setStation}
      station={station}
      />} exact path="/" />
      <Route component={() => <Widget station={station}/>} exact path="/widget" />
      <Route component={() => <Info station={station}/>} exact path="/info" />
    </Switch>
  );
}
