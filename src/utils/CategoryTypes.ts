export interface ChartDataset {
  data: number[];
  backgroundColor: string[];
  hoverBackgroundColor: string[];
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface Widget {
  id: string;
  widgetName: string;
  widgetText: string;
    chartData?: ChartData | null; // <-- optional and can be null
    isVisible: boolean
}

export interface Category {
  id: string;
  name: string;
  widgets: Widget[];
}

export interface CadrData {
  categories: Category[];
}
