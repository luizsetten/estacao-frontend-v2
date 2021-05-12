import React, { useEffect, useState } from 'react';

import DateFnsUtils from '@date-io/date-fns';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import brLocale from 'date-fns/locale/pt-BR';

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
    color: 'hsl(89, 70%, 50%)',
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
  {
    id: 'france',
    color: 'hsl(257, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 224,
      },
      {
        x: 'helicopter',
        y: 192,
      },
      {
        x: 'boat',
        y: 260,
      },
      {
        x: 'train',
        y: 295,
      },
      {
        x: 'subway',
        y: 27,
      },
      {
        x: 'bus',
        y: 83,
      },
      {
        x: 'car',
        y: 62,
      },
      {
        x: 'moto',
        y: 16,
      },
      {
        x: 'bicycle',
        y: 122,
      },
      {
        x: 'horse',
        y: 184,
      },
      {
        x: 'skateboard',
        y: 186,
      },
      {
        x: 'others',
        y: 45,
      },
    ],
  },
  {
    id: 'us',
    color: 'hsl(86, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 66,
      },
      {
        x: 'helicopter',
        y: 231,
      },
      {
        x: 'boat',
        y: 111,
      },
      {
        x: 'train',
        y: 98,
      },
      {
        x: 'subway',
        y: 252,
      },
      {
        x: 'bus',
        y: 210,
      },
      {
        x: 'car',
        y: 174,
      },
      {
        x: 'moto',
        y: 169,
      },
      {
        x: 'bicycle',
        y: 234,
      },
      {
        x: 'horse',
        y: 205,
      },
      {
        x: 'skateboard',
        y: 152,
      },
      {
        x: 'others',
        y: 50,
      },
    ],
  },
  {
    id: 'germany',
    color: 'hsl(23, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 207,
      },
      {
        x: 'helicopter',
        y: 106,
      },
      {
        x: 'boat',
        y: 83,
      },
      {
        x: 'train',
        y: 90,
      },
      {
        x: 'subway',
        y: 238,
      },
      {
        x: 'bus',
        y: 142,
      },
      {
        x: 'car',
        y: 22,
      },
      {
        x: 'moto',
        y: 111,
      },
      {
        x: 'bicycle',
        y: 57,
      },
      {
        x: 'horse',
        y: 251,
      },
      {
        x: 'skateboard',
        y: 230,
      },
      {
        x: 'others',
        y: 202,
      },
    ],
  },
  {
    id: 'norway',
    color: 'hsl(69, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 145,
      },
      {
        x: 'helicopter',
        y: 189,
      },
      {
        x: 'boat',
        y: 72,
      },
      {
        x: 'train',
        y: 53,
      },
      {
        x: 'subway',
        y: 209,
      },
      {
        x: 'bus',
        y: 201,
      },
      {
        x: 'car',
        y: 205,
      },
      {
        x: 'moto',
        y: 1,
      },
      {
        x: 'bicycle',
        y: 112,
      },
      {
        x: 'horse',
        y: 93,
      },
      {
        x: 'skateboard',
        y: 233,
      },
      {
        x: 'others',
        y: 105,
      },
    ],
  },
];

interface RecordEntry {
  x: string;
  y: number | undefined;
}

function Info({ station }: WidgetProps): JSX.Element {
  const [endDate, setEndDate] = useState<Date | number | null>(
    new Date().setHours(0, 0)
  );
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const [tempData, setTempData] = useState<Array<RecordEntry | undefined>>([]);
  const [pressureData, setpressureData] = useState<
    Array<RecordEntry | undefined>
  >([]);

  const [rec, setRec] = useState<Record>([]);

  const loadEntry = (records: Array<Record>) => {
    const array = records.map((record) => {
      if (record.created_at && record.temperature) {
        const aa: RecordEntry = {
          x: record.created_at,
          y: record.temperature,
        };
        return aa;
      }
      return undefined;
    });
    setTempData(array);
    const pressure = records.map((record) => {
      if (record.created_at && record.pressure) {
        const aa: RecordEntry = {
          x: format(new Date(record.created_at), 'dd/MM/yyyy hh:mm', {
            locale: brLocale,
          }),
          y: record.pressure,
        };
        return aa;
      }
      return undefined;
    });
    const fitered = pressure.filter((pressur) => pressur !== undefined);
    console.log('Pressão', fitered);
    setpressureData(fitered);
  };

  // const data = [
  //   {
  //     id: 'Temperatura',
  //     color: '#F55',
  //     data: tempData,
  //   },
  // ];

  const dataPress = [
    {
      id: 'blue',
      // id: 'Pressão',
      color: 'category10',
      data: [
        {
          x: 'plane',
          y: 66,
        },
        {
          x: 'helicopter',
          y: 231,
        },
        {
          x: 'boat',
          y: 111,
        },
        {
          x: 'train',
          y: 98,
        },
        {
          x: 'subway',
          y: 252,
        },
        {
          x: 'bus',
          y: 210,
        },
        {
          x: 'car',
          y: 174,
        },
        {
          x: 'moto',
          y: 169,
        },
        {
          x: 'bicycle',
          y: 234,
        },
        {
          x: 'horse',
          y: 205,
        },
        {
          x: 'skateboard',
          y: 152,
        },
        {
          x: 'others',
          y: 50,
        },
      ], // pressureData,
    },
  ];

  const loadRecord = async () => {
    try {
      if (!station.secure_id) return;

      const { data: record } = await axios.get<Array<Record>>(
        `/records/${station.secure_id}`
      );
      setRec(record);
      loadEntry(record);
      console.log(record);
    } catch (err) {
      alert('erro');
    }
  };

  useEffect(() => {
    loadRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Button
        color="primary"
        onClick={() => history.push('/')}
        variant="contained"
      >
        Retornar
      </Button>

      <Paper style={{ margin: 20, minHeight: 50, padding: 20 }}>
        <Grid container md={12} spacing={2} xs={12}>
          <Grid item md={2} xs={12}>
            <MuiPickersUtilsProvider locale={brLocale} utils={DateFnsUtils}>
              <DateTimePicker
                disableFuture
                label="Data Incial"
                onChange={setStartDate}
                value={startDate}
                variant="inline"
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item md={2} xs={12}>
            <MuiPickersUtilsProvider locale={brLocale} utils={DateFnsUtils}>
              <DateTimePicker
                disableFuture
                label="Data Incial"
                onChange={setEndDate}
                value={endDate}
                variant="inline"
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item md={2} xs={12}>
            <Button
              color="primary"
              onClick={() => console.log('oi')}
              variant="contained"
            >
              Filtrar
            </Button>
          </Grid>
          <Grid item md={2} xs={12}>
            <Button
              color="primary"
              onClick={() => console.log('oi')}
              variant="contained"
            >
              Baixar como .csv
            </Button>
          </Grid>
          <Grid item md={2} xs={12}>
            <Button
              color="primary"
              onClick={() => console.log('oi')}
              variant="contained"
            >
              Baixar tudo como .csv
            </Button>
          </Grid>
        </Grid>
      </Paper>

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
        <Grid item md={4} xs={12}>
          <Paper style={{ margin: 20, minHeight: 200 }}>
            <Typography align="center" variant="h6">
              Pressão
            </Typography>
            <div style={{ height: 300 }}>
              {pressureData && pressureData.length > 0 ? (
                <MyResponsiveLine
                  data={{ data: pressureData || [] }}
                  bottomLegend="Data/Hora"
                  leftLegend="Pressão hPa"
                />
              ) : (
                <div />
              )}
            </div>
          </Paper>
        </Grid>
        <Grid item md={4} xs={12}>
          <Paper style={{ margin: 20, minHeight: 200 }}>
            <Typography align="center" variant="h6">
              Humidade
            </Typography>
            <div style={{ height: 300 }}>
              <MyResponsiveLine
                data={data}
                bottomLegend="Data/Hora"
                leftLegend="Humidade %"
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Info;
