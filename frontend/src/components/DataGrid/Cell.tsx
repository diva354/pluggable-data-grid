import React from "react";

function EditorWrapper({
  isEditing,
  RendererComponent,
  EditorComponent,
  value,
  rowData,
  columnKey,
  onChange,
  onBlurOutside,
}: any) {
  if (isEditing && EditorComponent) {
    return (
      <EditorComponent
        value={value}
        rowData={rowData}
        columnKey={columnKey}
        onChange={onChange}
        onBlurOutside={onBlurOutside}
      />
    );
  }

  if (RendererComponent) {
    return (
      <RendererComponent
        value={value}
        rowData={rowData}
        columnKey={columnKey}
      />
    );
  }

  return <>{value}</>;
}

function Cell({ row, rowIdx, col, isEditing, onUpdateCell, onCellClick }: any) {
  const RendererComponent = col.renderer;
  const EditorComponent = col.editor;

  return (
    <div>
      <EditorWrapper
        isEditing={isEditing}
        RendererComponent={RendererComponent}
        EditorComponent={EditorComponent}
        value={row[col.key]}
        rowData={row}
        columnKey={col.key}
        onChange={(val: any) => onUpdateCell(rowIdx, col.key, val)}
        onBlurOutside={() => onCellClick(-1, "")}
      />
    </div>
  );
}

export default React.memo(Cell);