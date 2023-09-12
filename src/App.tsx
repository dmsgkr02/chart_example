import React from 'react';
import './App.css';
import Home from './pages/Home';
import { HttpClientImpl } from './api';
import ChartProvider from './context/HttpContext';

const BASE_URL =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;
const httpClient = new HttpClientImpl(BASE_URL || 'http://localhost:3000');

function App() {
  return (
    <ChartProvider httpClient={httpClient}>
      <Home />
    </ChartProvider>
  );
}

export default App;
