import React from 'react';
import MultiChart from '../components/chart/MultiChart';
import ChartProvider from '../context/ChartContext';

export default function Home() {
  return (
    <ChartProvider>
      <MultiChart />
    </ChartProvider>
  );
}
