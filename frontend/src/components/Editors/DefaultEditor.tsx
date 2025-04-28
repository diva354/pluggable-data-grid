import React, { useEffect, useRef, useState } from "react";

interface TextEditorProps {
  value: string;
  rowData: any;
  columnKey: string;
  onChange: (newValue: string) => void;
  onBlurOutside: () => void;
}

const DefaultEditor: React.FC<TextEditorProps> = ({
  value,
  onChange,
  onBlurOutside,
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onChange(inputValue.trim());
      onBlurOutside?.();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onBlurOutside?.(); // cancel edit on Escape
    }
  };

  const handleBlur = () => {
    onChange(inputValue.trim());
    onBlurOutside?.();
  };

  return (
    <input
      ref={inputRef}
      type="text"
      className="border px-2 py-1 rounded w-full"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    />
  );
};

export default DefaultEditor;
