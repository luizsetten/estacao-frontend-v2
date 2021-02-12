import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Text, WidgetContainer } from './styles';

function Widget() {
  return (
  <Container>
    <Link to='/'>Retornar</Link>
    <Text>Estação 01 - IFSULDEMINAS - Poços de caldas</Text>
    <WidgetContainer>
      <div>
        {/* Icone do tempo e marcação da temperatura */}

      </div>
      
    </WidgetContainer>
  </Container>
    );
}

export default Widget;
