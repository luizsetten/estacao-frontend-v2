import React, {useEffect, useState} from 'react';

// import { Container } from './styles';
import {
  Button, Typography
 } from '@material-ui/core';

import axios from '../../services/axios';
import history from '../../services/history';

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

function Info({ station }: WidgetProps): JSX.Element {
  const [rec,setRec] = useState<Record>({});

  const loadRecord = async () => {
    try{
      if(!station.secure_id) return;

      const {data: record} = await axios.get<Record>(`/records/${station.secure_id}`);
      setRec(record);
      console.log(record);
    } catch(err) {
      alert("erro");
    }
  };

  useEffect(() => {
    loadRecord();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <Button color="primary" onClick={() => history.push('/')} variant="contained">Retornar</Button>

    );
}

export default Info;
