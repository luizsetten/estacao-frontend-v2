import React, {useEffect, useState} from 'react';

import {
  Button, Typography
 } from '@material-ui/core';

import MyResponsiveLine from '../../components/Chart';
import axios from '../../services/axios';
import history from '../../services/history';
import {Record, Station} from '../../types';

interface WidgetProps {
  station: Station,
}

const data = [
  {
    id: "japan",
    color: "hsl(89, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 56
      },
      {
        x: "helicopter",
        y: 282
      },
      {
        x: "boat",
        y: 43
      },
      {
        x: "train",
        y: 81
      },
      {
        x: "subway",
        y: 152
      },
      {
        x: "bus",
        y: 203
      },
      {
        x: "car",
        y: 13
      },
      {
        x: "moto",
        y: 279
      },
      {
        x: "bicycle",
        y: 92
      },
      {
        x: "horse",
        y: 249
      },
      {
        x: "skateboard",
        y: 142
      },
      {
        x: "others",
        y: 182
      }
    ]
  },
  {
    id: "france",
    color: "hsl(257, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 224
      },
      {
        x: "helicopter",
        y: 192
      },
      {
        x: "boat",
        y: 260
      },
      {
        x: "train",
        y: 295
      },
      {
        x: "subway",
        y: 27
      },
      {
        x: "bus",
        y: 83
      },
      {
        x: "car",
        y: 62
      },
      {
        x: "moto",
        y: 16
      },
      {
        x: "bicycle",
        y: 122
      },
      {
        x: "horse",
        y: 184
      },
      {
        x: "skateboard",
        y: 186
      },
      {
        x: "others",
        y: 45
      }
    ]
  },
  {
    id: "us",
    color: "hsl(86, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 66
      },
      {
        x: "helicopter",
        y: 231
      },
      {
        x: "boat",
        y: 111
      },
      {
        x: "train",
        y: 98
      },
      {
        x: "subway",
        y: 252
      },
      {
        x: "bus",
        y: 210
      },
      {
        x: "car",
        y: 174
      },
      {
        x: "moto",
        y: 169
      },
      {
        x: "bicycle",
        y: 234
      },
      {
        x: "horse",
        y: 205
      },
      {
        x: "skateboard",
        y: 152
      },
      {
        x: "others",
        y: 50
      }
    ]
  },
  {
    id: "germany",
    color: "hsl(23, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 207
      },
      {
        x: "helicopter",
        y: 106
      },
      {
        x: "boat",
        y: 83
      },
      {
        x: "train",
        y: 90
      },
      {
        x: "subway",
        y: 238
      },
      {
        x: "bus",
        y: 142
      },
      {
        x: "car",
        y: 22
      },
      {
        x: "moto",
        y: 111
      },
      {
        x: "bicycle",
        y: 57
      },
      {
        x: "horse",
        y: 251
      },
      {
        x: "skateboard",
        y: 230
      },
      {
        x: "others",
        y: 202
      }
    ]
  },
  {
    id: "norway",
    color: "hsl(69, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 145
      },
      {
        x: "helicopter",
        y: 189
      },
      {
        x: "boat",
        y: 72
      },
      {
        x: "train",
        y: 53
      },
      {
        x: "subway",
        y: 209
      },
      {
        x: "bus",
        y: 201
      },
      {
        x: "car",
        y: 205
      },
      {
        x: "moto",
        y: 1
      },
      {
        x: "bicycle",
        y: 112
      },
      {
        x: "horse",
        y: 93
      },
      {
        x: "skateboard",
        y: 233
      },
      {
        x: "others",
        y: 105
      }
    ]
  }
];

function Info({ station }: WidgetProps): JSX.Element {
  const [rec,setRec] = useState<Record>({});

  const loadRecord = async () => {
    try{
      if(!station.secure_id) return;

      const {data: record} = await axios.get<Record>(`/records/${station.secure_id}`);
      setRec(record);
      console.log(record);
    } catch(err) {
      alert("erro");
    }
  };

  useEffect(() => {
    loadRecord();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <>
    <Button color="primary" onClick={() => history.push('/')} variant="contained">Retornar</Button>

    <MyResponsiveLine data={data}/>
    </>
    );
}

export default Info;
