import React, { useState } from 'react';
import { useChart } from '../../context/ChartContext';

export default function Filter() {
  const { selectedId, setSelectedId, ids, getDataSets, response } = useChart();

  const changeId = (value: string) => {
    setSelectedId(value);
    getDataSets(response, value);
  };

  return (
    <fieldset>
      <legend>선택</legend>
      {ids.length > 0 &&
        ids.map((value) => {
          return (
            <label key={value}>
              <input type='radio' value={value} checked={selectedId === value} onChange={() => changeId(value)} />
              {value}
            </label>
          );
        })}
    </fieldset>
  );
}
