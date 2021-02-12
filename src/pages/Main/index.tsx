import React from 'react';

import Button from '../../components/Button';
import history from '../../services/history';
import {
 Container, Map, Select, TextOpt
} from './styles';

function Main(): JSX.Element {
  function loadHandler() {
    history.push('/widget');
  }

  return (
    <Container>
      <TextOpt>Selecione uma estação meteorológica no campo abaixo</TextOpt>
      <Select id="" name="">
        <option value="">0000 - PCS - ISULDEMINAS 001</option>
        {/* Inserir a função que carrega as estações meteorológicas listadas na base de dados */}
      </Select>
      <Button onClick={loadHandler}>Carregar</Button>
      <TextOpt>OU</TextOpt>
      <TextOpt>Selecione uma estação meteorológica no mapa abaixo</TextOpt>
      <Map />
    </Container>
  );
}

export default Main;
