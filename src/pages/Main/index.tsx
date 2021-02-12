import React from 'react';
import history from '../../services/history';

import { Container, TextOpt, Map, Select } from './styles';

import Button from '../../components/Button';

function Main() {
  function loadHandler() {
    history.push('/widget');
  }

  return (
    <Container>
      <TextOpt>Selecione uma estação meteorológica no campo abaixo</TextOpt>
      <Select name="" id="">
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
