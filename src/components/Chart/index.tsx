import React from "react";

import { ResponsiveLine } from "@nivo/line";

interface Props {
  data: any
}

const MyResponsiveLine = ({ data /* see data tab */ }: Props): JSX.Element => (
  <ResponsiveLine
      axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'transportation',
          legendOffset: 36,
          legendPosition: 'middle'
      }}
      axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle'
      }}
      axisRight={null}
      axisTop={null}
      data={data}
      legends={[
          {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemBackground: 'rgba(0, 0, 0, .03)',
                          itemOpacity: 1
                      }
                  }
              ]
          }
      ]}
      margin={{
        top: 50,
        right: 110,
        bottom: 50,
        left: 60
      }}
      pointBorderColor={{ from: 'serieColor' }}
      pointBorderWidth={2}
      pointColor={{ theme: 'background' }}
      pointLabelYOffset={-12}
      pointSize={10}
      useMesh
      xScale={{ type: 'point' }}
      yFormat=" >-.2f"
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false
      }}
  />
);

export default MyResponsiveLine;
