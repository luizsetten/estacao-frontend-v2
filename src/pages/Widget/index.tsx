import React, { useEffect, useState } from 'react';

import {
  Button, Typography
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
    try{
      if(!station.secure_id) return;

      const {data: record} = await axios.get<Record>(`/records/${station.secure_id}/last`);
      setRec(record);
    } catch(err) {
      alert("erro");
    }
  };

  useEffect(() => {
    loadRecord();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
  <Container>

    <Button color="primary" onClick={() => history.push('/')} variant="contained">Retornar</Button>

    <Typography hidden={!station.name} variant="h5">{station.name} - {station.city}/{station.uf}</Typography>
    <WidgetContainer>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
        <TextLine>
          <Typography hidden={!rec.temperature}>Temperatura: {rec.temperature}°C</Typography>
        </TextLine>
        <TextLine>
          <Typography hidden={!rec.pressure}>Pressure: {rec.pressure}hPa</Typography>
        </TextLine>
        <TextLine style={{ display: !rec.humidity ? 'none' : 'flex'}}>
          <Typography>Humidade: {rec.humidity}%</Typography>
        </TextLine>
        <TextLine style={{ display: !rec.rainfall ? 'none' : 'flex'}}>
          <Typography style={{alignSelf: 'center'}}>Precipitação: {rec.rainfall}mm/M²</Typography>
        </TextLine>
        <TextLine style={{ display: !rec.windGust ? 'none' : 'flex'}}>
          <Typography style={{alignSelf: 'center'}}>Rajada do vento: {rec.windGust}km/h</Typography>
        </TextLine>
        <TextLine style={{ display: !rec.windDirection ? 'none' : 'flex'}}>
          <Typography style={{alignSelf: 'center'}}>Direção do vento: {rec.windDirection}°</Typography>
        </TextLine>
        <TextLine style={{ display: !rec.windSpeed ? 'none' : 'flex'}}>
          <Typography style={{alignSelf: 'center'}}>Velocidade do vento: {rec.windSpeed}km/h</Typography>
        </TextLine>
        <TextLine style={{ display: !rec.solarIncidence ? 'none' : 'flex'}}>
          <Typography style={{alignSelf: 'center'}}>Incidencia solar: {rec.solarIncidence}W/M²</Typography>
        </TextLine>

        <Button color="primary" onClick={() => history.push('/info') } style={{maxWidth: '12em', alignSelf: 'center'}}
variant="contained">Mais Detalhes</Button>
      </div>

    </WidgetContainer>
  </Container>
    );
}

export default Widget;
