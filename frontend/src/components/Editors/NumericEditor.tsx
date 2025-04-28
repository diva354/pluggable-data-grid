import React, { useState, useEffect, ChangeEvent, KeyboardEvent, FocusEvent } from "react";

interface NumericEditorProps {
  value: number;
  onChange: (val: number) => void;
  onBlurOutside?: () => void;
}

export default function NumericEditor({ value, onChange, onBlurOutside }: NumericEditorProps) {
  const [inputVal, setInputVal] = useState(value.toString());

  useEffect(() => {
    setInputVal(value.toString());
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value); //  do not call onChange yet
  };

  const commitChange = () => {
    const numericValue = parseFloat(inputVal);
    if (!isNaN(numericValue)) {
      onChange(numericValue); //  commit change once
    }
    onBlurOutside?.(); //  signal exit from edit mode
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      commitChange();
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      commitChange();
    }, 0); // Defer to ensure focus event chain settles
  };

  return (
    <input
      type="number"
      className="px-2 py-1 border rounded w-full text-sm"
      value={inputVal}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      autoFocus
    />
  );
}