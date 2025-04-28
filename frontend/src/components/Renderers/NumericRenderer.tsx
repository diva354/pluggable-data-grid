import React from "react";
import { CellRendererProps } from "../DataGrid/types";

const NumericRenderer: React.FC<CellRendererProps<number>> = ({ value }) => {
  return <div className="text-right tabular-nums">{value}</div>;
};

export default NumericRenderer;
