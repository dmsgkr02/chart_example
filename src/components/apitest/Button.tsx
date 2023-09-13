import React from 'react';
import { httpClientInstanse } from '../../api';

export default function Button() {
  const onClick = async () => {
    const { response } = await httpClientInstanse.fetch('/chart/mock_data').then((response) => response.json());
    console.info(response);
  };

  return <button onClick={onClick}>Button</button>;
}
