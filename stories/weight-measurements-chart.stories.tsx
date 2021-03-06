import * as React from 'react';
import { WeightMeasurementChart } from './weight-measurement-chart';

export default {
  title: 'WeightMeasurementsChart',
  component: WeightMeasurementChart,
};

export const Default = () => (
  <WeightMeasurementChart
    data={[
      {
        date: new Date(2018, 3, 20),
        value: 55.6,
      },
      {
        date: new Date(2018, 3, 21),
        value: 55.3,
      },
      {
        date: new Date(2018, 3, 22),
        value: 55.0,
      },
      {
        date: new Date(2018, 3, 23),
        value: 55.4,
      },
      {
        date: new Date(2018, 3, 24),
        value: 55.0,
      },
      {
        date: new Date(2018, 3, 25),
        value: 54.7,
      },
      {
        date: new Date(2018, 3, 26),
        value: 54.3,
      },
    ]}
  />
);
