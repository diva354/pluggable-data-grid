import React, { useEffect, useState, KeyboardEvent, ChangeEvent, FocusEvent } from "react";
import TagRenderer from "../Renderers/TagRenderer";

interface TagEditorProps {
  value: string[]; // from the grid cell
  onChange: (tags: string[]) => void;
  onBlurOutside?: () => void;
}

export default function TagEditor({ value, onChange, onBlurOutside }: TagEditorProps) {
  console.log("TagEditor received value:", value); // 👈 Add this line here
  const [tags, setTags] = useState<string[]>(Array.isArray(value) ? value : typeof value === "string" ? [value] : []);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const isValidTag = (tag: string) => /^[a-zA-Z0-9_@:-]+$/.test(tag);
  //Should allow letters, Numbers, underscores, Hyphen, '@' symbol and colon ':'

  // Keep internal state in sync with parent (important if editing multiple cells)
  useEffect(() => {
    setTags(
      Array.isArray(value)
        ? value
        : typeof value === "string"
        ? [value]
        : []
    );
  }, [value]);
  
  useEffect(() => {
    console.log("✅ onBlurOutside is", typeof onBlurOutside);
  }, []);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
  
    if (!isValidTag(trimmed)) {
      setError("Tags can only contain letters, numbers, underscores (_), hyphens (-), at signs (@), and colons (:).");
      return;
    }
  
    if (trimmed && !tags.includes(trimmed)) {
      const updatedTags = [...tags, trimmed];
      setTags(updatedTags);
      onChange(updatedTags);
    }
  
    setInputValue("");
    setError("");
  };  

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    onChange(updatedTags); // push to parent
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const trimmed = inputValue.trim();
  
    // Add tag on Enter, Comma, or Tab
    if ((e.key === "Enter" || e.key === "," || e.key === "Tab") && trimmed) {
      e.preventDefault(); // prevent tabbing away until tag is added
      addTag(trimmed);
    }
  
    // Remove last tag on Backspace if input is empty
    if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      const updatedTags = tags.slice(0, -1);
      setTags(updatedTags);
      onChange(updatedTags);
    }
  };  

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (inputValue.trim()) {
      addTag(inputValue);
    } 
    onBlurOutside?.();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md">
      <TagRenderer tags={tags} onRemove={removeTag} />
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder="Add tag"
        className="flex-grow min-w-[120px] px-2 py-1 outline-none text-sm"
      />
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
}