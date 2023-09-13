import React from 'react';
import MultiChart from '../components/chart/MultiChart';
import ChartProvider from '../context/ChartContext';
import Button from '../components/apitest/Button';

export default function Home() {
  return (
    <ChartProvider>
      <Button></Button>
      <MultiChart />
    </ChartProvider>
  );
}
