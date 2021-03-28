import React, {useContext, useEffect, useState} from 'react';

import {
 Button,
 FormControl,
 Grid,
 InputLabel,
 MenuItem,
 Select,
 Typography
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import axios from '../../services/axios';
import history from '../../services/history';
import { Container } from './styles';

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

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStationSelected(event.target.value as string);
  };

  function loadHandler() {
      const selectedStation = stations
      .find((stationF) => stationF.secure_id === stationSelected) || {
      name: '',
      secure_id: '',
      city: '',
      uf: '',
      latitude: 0,
      longitude: 0
    };
    setStation(selectedStation);
    history.push(`/widget`);
  }

  const loadStations = async () => {
    try{
      const response = await axios('/stations', { method: 'get'});
      setStations(response.data);
    } catch (e) {
      console.error("Erro inesperado!");
    }
  };

  useEffect(() => {
    loadStations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Grid container direction="column" justify="center"
        md={4}>
      <Grid item>
      <Typography>Selecione uma estação meteorológica no campo abaixo</Typography>
      </Grid>
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
          {stations.map((stationOpt) => (
          <MenuItem
          key={stationOpt.secure_id}
          value={stationOpt.secure_id}>
            {stationOpt.name}
            </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Button color="primary" onClick={loadHandler} variant="contained">Carregar</Button>
      </Grid>
    </Container>
  );
}

export default Main;
