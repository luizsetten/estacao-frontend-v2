import React, { useEffect, useState } from 'react';

// eslint-disable-next-line object-curly-newline
import {
  Button,
  Typography,
  Grid,
  Paper,
  CardMedia,
  Card,
  Box,
} from '@material-ui/core';

import axios from '../../services/axios';
import history from '../../services/history';
import { Container, TextLine, WidgetContainer } from './styles';
import sun from '../../images/sun.png';
import rain1 from '../../images/rain1.png';
import rain2 from '../../images/rain2.png';
import rain3 from '../../images/rain3.png';

interface Station {
  name: string;
  secure_id: string;
  city: string;
  uf: string;
  latitude: number;
  longitude: number;
}
interface WidgetProps {
  station: Station;
}

interface Record extends Object {
  temperature?: number;
  pressure?: number;
  humidity?: number;
  rainfall?: number;
  windGust?: number;
  windDirection?: number;
  windSpeed?: number;
  solarIncidence?: number;
}

interface DataLineProps {
  label: string;
  value: string | number | undefined;
  unity: string;
}

const DataLine = ({ label, value, unity }: DataLineProps) => (
  <Grid item md={10}>
    {/* Add hidden if value is undefined */}
    <Paper>
      <Box p={1}>
        <Typography>
          <strong>{label}</strong> {value} {unity}
        </Typography>
      </Box>
    </Paper>
  </Grid>
);

function Widget({ station }: WidgetProps): JSX.Element {
  const [rec, setRec] = useState<Record>({});

  const loadRecord = async () => {
    try {
      if (!station.secure_id) return;

      const { data: record } = await axios.get<Record>(
        `/records/${station.secure_id}/last`
      );
      setRec(record);
    } catch (err) {
      alert('erro');
    }
  };

  useEffect(() => {
    loadRecord();
  }, []);

  function returnImage() {
    if (rec && rec.rainfall && rec.rainfall > 0) {
      if (rec.rainfall < 30) return rain1;
      if (rec.rainfall < 50) return rain2;
      return rain3;
    }
    return sun;
  }

  return (
    <Container>
      <Button
        color="primary"
        onClick={() => history.push('/')}
        variant="contained"
      >
        Retornar
      </Button>

      <Typography hidden={!station.name} variant="h5">
        {station.name} - {station.city}/{station.uf}
      </Typography>
      <WidgetContainer>
        <Grid container justify="center" style={{ marginTop: '1em' }}>
          <Grid container md={12} direction="row" justify="space-around">
            <Grid item>
              <Card>
                <CardMedia
                  image={returnImage()}
                  style={{ width: 130, height: 130 }}
                />
              </Card>
            </Grid>
            <Grid item>
              <Card
                style={{
                  width: 130,
                  height: 130,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="h4"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  22°C
                </Typography>
              </Card>
            </Grid>
          </Grid>
          <DataLine label="Temperatura:" value={rec.temperature} unity="°C" />
          <DataLine label="Pressão:" value={rec.pressure} unity="hPa" />
          <DataLine label="Humidade:" value={rec.humidity} unity="%" />
          <DataLine label="Precipitação:" value={rec.rainfall} unity="mm/M²" />
          <DataLine
            label="Rajada do vento:"
            value={rec.windGust}
            unity="Km/h"
          />
          <DataLine
            label="Direção do vento:"
            value={rec.windDirection}
            unity="°"
          />
          <DataLine
            label="Velocidade do vento:"
            value={rec.windSpeed}
            unity="Km/h"
          />
          <DataLine
            label="Incidência Solar:"
            value={rec.solarIncidence}
            unity="W/M²"
          />
          <Button
            color="primary"
            onClick={() => history.push('/info')}
            style={{ maxWidth: '12em', alignSelf: 'center' }}
            variant="contained"
          >
            Mais Detalhes
          </Button>
        </Grid>
      </WidgetContainer>
    </Container>
  );
}

export default Widget;
