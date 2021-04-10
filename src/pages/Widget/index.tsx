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
import { Container, WidgetContainer } from './styles';
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
  wind_gust?: number;
  wind_direction?: number;
  wind_speed?: number;
  solar_incidence?: number;
}

interface DataLineProps {
  label: string;
  value: string | number | undefined;
  unity: string;
}

const DataLine = ({ label, value, unity }: DataLineProps) => {
  if (!value && value !== 0) return <></>;
  return (
    <Grid item md={10}>
      <Paper>
        <Box p={1}>
          <Typography>
            <strong>{label}</strong> {String(value).replace('.', ',')} {unity}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

function Widget({ station }: WidgetProps): JSX.Element {
  const [rec, setRec] = useState<Record>({});

  const loadRecord = async () => {
    try {
      if (!station.secure_id) return;

      const { data: record, status } = await axios.get<Record>(
        `/records/${station.secure_id}/last`
      );
      if (status === 500) throw new Error('Internal error!');
      setRec(record);
    } catch (err) {
      console.log(err);
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
      <WidgetContainer style={{ minHeight: 600 }}>
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
                  {rec.temperature && String(rec.temperature).replace('.', ',')}{' '}
                  °C
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
            value={rec.wind_gust}
            unity="Km/h"
          />
          <DataLine
            label="Direção do vento:"
            value={rec.wind_direction}
            unity="°"
          />
          <DataLine
            label="Velocidade do vento:"
            value={rec.wind_speed}
            unity="Km/h"
          />

          <DataLine
            label="Incidência Solar:"
            value={rec.solar_incidence}
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
