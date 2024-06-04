

declare module 'react-vis' {
  import { ComponentType, ReactNode } from 'react';

  interface XYPlotProps {
    width: number;
    height: number;
    stackBy?: string;
    xType?: string;
    children?: ReactNode;
  }

  export const XYPlot: ComponentType<XYPlotProps>;

  interface VerticalRectSeriesProps {
    data: Array<{ x0: number; x: number; y: number }>;
    style?: { [key: string]: any };
  }

  export const VerticalRectSeries: ComponentType<VerticalRectSeriesProps>;

  export const XAxis: ComponentType<any>;
  export const YAxis: ComponentType<any>;
}
