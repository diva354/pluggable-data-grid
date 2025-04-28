import React, { useState , useCallback } from "react";
import { DataGridProps } from "./types";
import Row from '../DataGrid/Row';

const DataGrid: React.FC<DataGridProps> = ({ columns, data, onDataChange }) => {
  const [editCell, setEditCell] = useState<{ rowIdx: number; colKey: string } | null>(null);

  const handleCellClick = useCallback((rowIdx: number, colKey: string) => {
    setEditCell({ rowIdx, colKey });
  },[]);

  const updateCell = useCallback((rowIdx: number, colKey: string, newValue: any) => {
    const updated = [...data];
    updated[rowIdx] = { ...updated[rowIdx], [colKey]: newValue };
    onDataChange?.(updated);
    setEditCell(null);
  },[]);

  return (
    <div className="max-h-[500px] overflow-auto border rounded">
    <table border={1} cellPadding={8} className="w-full border-collapse">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="border px-4 py-2 text-left bg-black-100">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIdx) => (
          <Row
            key={rowIdx}
            row={row}
            rowIdx={rowIdx}
            columns={columns}
            editCell={editCell}
            onCellClick={handleCellClick}
            onUpdateCell={updateCell}
          />
        ))}
      </tbody>

    </table>
    </div>
  );
};

export default DataGrid;