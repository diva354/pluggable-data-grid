export interface User {
    id: number;
    name: string;
    avatarUrl: string;
  }
  
  export interface CellRendererProps<T> {
    value: T;
    rowData: any;
    columnKey: string;
    onChange?: (val: T) => void;
  }

export type CellRenderer = (props: CellRendererProps<any>) => JSX.Element;
export type CellEditor = (props: CellRendererProps<any>) => JSX.Element;

export interface ColumnConfig {
  key: string;
  label: string;
  renderer?: CellRenderer;
  editor?: CellEditor;
}

export interface DataGridProps {
  columns: ColumnConfig[];
  data: any[];
  onDataChange?: (newData: any[]) => void;
}
  