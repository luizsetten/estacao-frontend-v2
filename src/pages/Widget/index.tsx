import React from 'react';
import { Link } from 'react-router-dom';

import {
  Button, FormControl, InputLabel, MenuItem, Select, Typography
 } from '@material-ui/core';

import history from '../../services/history';
import { Container, Text, WidgetContainer } from './styles';

interface Station {
  name: string,
  secure_id: string,
  city: string,
  uf: string,
  latitude: number,
  longitude: number
}
interface WidgetProps {
  station: Station,
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Widget({ station }: WidgetProps): JSX.Element {
  return (
  <Container>

    <Button color="primary" onClick={() => history.push('/')} variant="contained">Retornar</Button>

    <Typography>{station.name}</Typography>
    <WidgetContainer>
      <div>
        {/* Icone do tempo e marcação da temperatura */}

      </div>

    </WidgetContainer>
  </Container>
    );
}

export default Widget;
