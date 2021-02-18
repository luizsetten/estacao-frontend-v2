import React, { useEffect, useState } from 'react';

import {
  Button, FormControl, InputLabel, MenuItem, Select, Typography
 } from '@material-ui/core';

import axios from '../../services/axios';
import history from '../../services/history';
import { Container, TextLine, WidgetContainer } from './styles';

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

interface Record extends Object {
  temperature?: number,
  pressure?: number,
  humidity?: number,
  rainfall?: number,
  windGust?: number,
  windDirection?: number,
  windSpeed?: number,
  solarIncidence?: number,
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Widget({ station }: WidgetProps): JSX.Element {
  const [rec,setRec] = useState<Record>({});

  const loadRecord = async () => {
    const {data: record} = await axios.get<Record>(`/records/${station.secure_id}/last`);
    setRec(record);
  };

  useEffect(() => {
    loadRecord();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
  <Container>

    <Button color="primary" onClick={() => history.push('/')} variant="contained">Retornar</Button>

    <Typography variant="h5">{station.name} - {station.city}/{station.uf}</Typography>
    <WidgetContainer>
      <div style={{ display: 'flex', flexDirection: 'column'}}>

          <Typography>Temperatura: {rec.temperature}°C</Typography>
          <Typography>Pressure: {rec.pressure}hPa</Typography>
          <Typography>Humidade: {rec.humidity}%</Typography>
          <Typography>Precipitação: {rec.rainfall}mm/M²</Typography>
      </div>

    </WidgetContainer>
  </Container>
    );
}

export default Widget;
