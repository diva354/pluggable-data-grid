import React from "react";
import Cell from '../DataGrid/Cell';
const Row = React.memo(function Row({
    row,
    rowIdx,
    columns,
    editCell,
    onCellClick,
    onUpdateCell
  }: {
    row: any;
    rowIdx: number;
    columns: any[];
    editCell: { rowIdx: number; colKey: string } | null;
    onCellClick: (rowIdx: number, colKey: string) => void;
    onUpdateCell: (rowIdx: number, colKey: string, value: any) => void;
  }) {
    return (
      <tr key={rowIdx} className="even:bg-black-50">
        {columns.map((col) => {
          const isEditing = editCell?.rowIdx === rowIdx && editCell.colKey === col.key;
  
          return (
              <td
                  key={col.key}
                  data-renderer={col.rendererType}
                  onClick={() => col.editor && onCellClick(rowIdx, col.key)}
                  style={{ cursor: col.editor ? "pointer" : "default" }}
                  className={`border px-4 py-2 ${!col.editor ? 'bg-black-100 text-gray-500' : ''}`}
              >
                  <Cell
                      row={row}
                      rowIdx={rowIdx}
                      col={col}
                      isEditing={isEditing}
                      onUpdateCell={onUpdateCell}
                      onCellClick={onCellClick}
                  />
              </td>

          );
        })}
      </tr>
    );
  });
  
  export default Row;