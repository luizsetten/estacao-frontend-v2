import React, { useEffect, useState } from 'react';

import { Button, Grid, Paper, Typography } from '@material-ui/core';

import { toast } from 'react-toastify';
import MyResponsiveLine from '../../components/Chart';
import axios from '../../services/axios';
import history from '../../services/history';
import { Record, Station } from '../../types';

interface WidgetProps {
  station: Station;
}

const data = [
  {
    id: 'japan',
    color: '#A00',
    data: [
      {
        x: 'plane',
        y: 56,
      },
      {
        x: 'helicopter',
        y: 282,
      },
      {
        x: 'boat',
        y: 43,
      },
      {
        x: 'train',
        y: 81,
      },
      {
        x: 'subway',
        y: 152,
      },
      {
        x: 'bus',
        y: 203,
      },
      {
        x: 'car',
        y: 13,
      },
      {
        x: 'moto',
        y: 279,
      },
      {
        x: 'bicycle',
        y: 92,
      },
      {
        x: 'horse',
        y: 249,
      },
      {
        x: 'skateboard',
        y: 142,
      },
      {
        x: 'others',
        y: 182,
      },
    ],
  },
];

interface RecordEntry {
  x: string;
  y: number | undefined;
}

function Info({ station }: WidgetProps): JSX.Element {
  const [loading, setLoading] = useState(true);
  // TODO: Insert dynamic rendering of charts

  const loadRecords = async () => {
    try {
      setLoading(true);
      if (!station.secure_id) return;

      const { data: record } = await axios.get<Array<Record>>(
        `/records/${station.secure_id}`
      );
    } catch (e) {
      // TODO: add error toast
      toast('Erro ao carregar os dados!', {
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // TODO: load records
    loadRecords();
  }, [station]);

  if (loading) {
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  }

  return (
    <>
      <Grid container md={12} xs={12}>
        <Grid item md={4} xs={12}>
          <Paper style={{ margin: 20, minHeight: 200 }}>
            <Typography align="center" variant="h6">
              Temperatura
            </Typography>
            <div style={{ height: 300 }}>
              <MyResponsiveLine
                bottomLegend="Data/Hora"
                data={data}
                leftLegend="Temperatura °C"
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Info;
