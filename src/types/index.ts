import type { ScriptableContext, ChartType, ChartEvent, ActiveElement } from 'chart.js';

export interface ChartData {
  labels: string[];
  datasets: DataSet[];
}

export interface DataSet {
  type: 'line' | 'bar';
  label: string;
  borderWidth?: number;
  data: any[];
  yAxisID: string;
  fill?: boolean;
  backgroundColor?: ((context: ChartContextAPI) => string) | string;
  borderColor?: (context: ChartContextAPI) => string;
}

export interface Response {
  date: string;
  id: string;
  value_area: number;
  value_bar: number;
}

export type ChartContextAPI = ScriptableContext<ChartType>;

export type ChartClick = (e: ChartEvent, elements: ActiveElement[], response: Response[]) => void;
