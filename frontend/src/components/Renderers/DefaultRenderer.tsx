import React from "react";
import { CellRendererProps } from "../DataGrid/types";

const DefaultRenderer: React.FC<CellRendererProps<any>> = ({ value }) => {
  return (
    <div className="text-sm text-white-800 whitespace-nowrap overflow-hidden text-ellipsis">
      {value ?? "—"}
    </div>
  );
};

export default DefaultRenderer;
