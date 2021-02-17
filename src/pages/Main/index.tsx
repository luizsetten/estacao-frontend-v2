import React, {useEffect, useState} from 'react';

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

function Main(): JSX.Element {
  const classes = useStyles();
  const [station, setStation] = useState('');

  function loadHandler() {
    history.push('/widget');
  }

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStation(event.target.value as string);
  };

  useEffect(() => {
    // const response = await axios('/stations')
    //  Call axios here
  }, []);

  const renderOptions = () => {

  };

  return (
    <Container>
      <Typography>Selecione uma estação meteorológica no campo abaixo</Typography>
      {/* <Select id="" name="">
        <option value="">0000 - PCS - ISULDEMINAS 001</option>
        Inserir a função que carrega as estações meteorológicas listadas na base de dados
      </Select> */}
      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel id="stationSelectorLabel">Estação</InputLabel>
        <Select
          id="stationSelector"
          label="Estação"
          labelId="stationSelectorLabel"
          onChange={handleChange}
          value={station}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
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
