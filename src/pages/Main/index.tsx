import React, {useContext, useEffect, useState} from 'react';

import {
 Button, FormControl, InputLabel, MenuItem, Select, Typography
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import axios from '../../services/axios';
import history from '../../services/history';
import {
 Container, Map
} from './styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: '15em',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),);

interface Station {
  name: string,
  secure_id: string,
  city: string,
  uf: string,
  latitude: number,
  longitude: number
}
interface MainProps {
  station: Station,
  setStation: (station: Station) => void,
  // stations: Station[],
  // setStations: (stations: Station[]) => void
}

function Main({
 station, setStation
  // stations, setStations
}: MainProps): JSX.Element {
  const [stationSelected, setStationSelected] = useState<string>('');
  const [stations, setStations] = useState<Station[]>([]);

  const classes = useStyles();

  function loadHandler() {
    history.push(`/widget`);
  }

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedStation = stations
      .find((stationF) => stationF.secure_id === event.target.value) || {
      name: '',
      secure_id: '',
      city: '',
      uf: '',
      latitude: 0,
      longitude: 0
    };
    console.log(event.target.value);
    setStationSelected(event.target.value as string);
    setStation(selectedStation);
  };

  const loadStations = async () => {
    const response = await axios('/stations', { method: 'get'});
    console.log(response);
    setStations(response.data);
  };

  useEffect(() => {
    loadStations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Typography>Selecione uma estação meteorológica no campo abaixo</Typography>
      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel id="stationSelectorLabel">Estação</InputLabel>
        <Select
          id="stationSelector"
          label="Estação"
          labelId="stationSelectorLabel"
          onChange={handleChange}
          value={stationSelected}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {stations.map((stationOpt) => <MenuItem
          key={stationOpt.secure_id}
          value={stationOpt.secure_id}>
            {stationOpt.name}
            </MenuItem>)}
        </Select>
      </FormControl>
      <Button color="primary" onClick={loadHandler} variant="contained">Carregar</Button>
      <Typography>OU</Typography>
      <Typography>Selecione uma estação meteorológica no mapa abaixo</Typography>
      <Map />
    </Container>
  );
}

export default Main;
