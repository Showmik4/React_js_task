import React from 'react';
import { Line } from 'react-chartjs-2';

const ChartComponent = ({ csvData }) => {
  const chartData = {
    labels: csvData.map(entry => entry.Y),
    datasets: [
      {
        label: 'X values',
        data: csvData.map(entry => entry.X),
        fill: false,
        borderColor: 'blue',
      },
    ],
  };

  return <Line data={chartData} />;
};

export default ChartComponent;
