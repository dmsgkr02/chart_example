import React, { createContext, useContext, useEffect, useState, useCallback, Dispatch, SetStateAction } from 'react';
import { Response, ChartData, ChartClick, ChartContextAPI } from '../types';
import { httpClientInstanse } from '../api';
import { ChartOptions } from 'chart.js';
import { BAR_CHART_COLOR, BAR_CHART_HIGHLIGHT_COLOR, AREA_CHART_COLOR } from '../constants';

interface ChartContextType {
  data: ChartData;
  options: ChartOptions;
  getDataSets: (response: Response[], selectedId: string) => void;
  response: Response[];
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
  ids: string[];
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);
export const useChart = () => useContext(ChartContext) as ChartContextType;

type Props = {
  children: React.ReactNode;
};

const ALL = '전체';

export default function ChartProvider({ children }: Props) {
  const [response, setResponse] = useState<Response[]>([]);
  const [data, setData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [options, setOptions] = useState<ChartOptions>({});
  const [selectedId, setSelectedId] = useState(ALL);
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const getResponse = async () => {
      const { response } = await httpClientInstanse.fetch('/chart/mock_data').then((response) => response.json());
      const responseArray: Response[] = Object.keys(response).map((key) => {
        return {
          date: key,
          ...response[key],
        };
      });
      setResponse(responseArray);
      getDataSets(responseArray, ALL);
      setOptions(getOptions(responseArray));
      const ids = Array.from(new Set(responseArray.map((response) => response.id)));
      setIds([ALL, ...ids]);
    };

    getResponse();
  }, []);

  const getDataSets = useCallback(
    (response: Response[], selectedId: string) => {
      setData({
        labels: response.map((response) => response.date),
        datasets: [
          {
            type: 'line',
            label: 'value_area',
            data: response.map((response) => response.value_area),
            yAxisID: 'line',
            fill: true,
            backgroundColor: AREA_CHART_COLOR,
          },
          {
            type: 'bar',
            label: 'value_bar',
            borderWidth: 2,
            data: response.map((response) => response.value_bar),
            yAxisID: 'bar',
            backgroundColor: (context: ChartContextAPI) => {
              const { dataIndex } = context;
              return response[dataIndex].id === selectedId ? BAR_CHART_HIGHLIGHT_COLOR : BAR_CHART_COLOR;
            },
          },
        ],
      });
    },
    [response],
  );

  const getOptions = useCallback((response: Response[]): ChartOptions => {
    const handleChartClick: ChartClick = (_, elements, response: Response[]) => {
      const element = elements[0];
      if (!element) {
        return;
      }
      getDataSets(response, response[element.index].id);
      setSelectedId(response[element.index].id);
    };

    return {
      scales: {
        x: {
          grid: {
            drawOnChartArea: false,
          },
        },
        bar: {
          display: true,
          position: 'left',
        },
        line: {
          display: true,
          position: 'right',
        },
      },
      interaction: {
        mode: 'index',
      },
      onClick: (_, elements) => handleChartClick(_, elements, response),
      plugins: {
        tooltip: {
          callbacks: {
            title(tooltipItems: any) {
              const tooltipItem = tooltipItems[0];
              return `${tooltipItem.label}, id: ${response[tooltipItem.dataIndex].id}`;
            },
          },
        },
      },
    };
  }, []);

  return (
    <ChartContext.Provider value={{ data, options, getDataSets, response, selectedId, setSelectedId, ids }}>
      {children}
    </ChartContext.Provider>
  );
}
