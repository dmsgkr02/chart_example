import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Filler,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import Filter from '../filter/Filter';
import { useChart } from '../../context/ChartContext';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Filler,
);

export default function MultiChart() {
  const { data, options } = useChart();

  return (
    <>
      <Filter />
      <Chart type='bar' data={data} options={options} />
    </>
  );
}
