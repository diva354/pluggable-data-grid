import React, { useState, useEffect, useRef } from "react";
import {User} from '../DataGrid/types';

interface MultiSelectEditorProps {
  value: string[]; // list of selected names
  onChange: (selected: string[]) => void;
  options: User[];
  loading?: boolean;
}

const MultiSelectEditor: React.FC<MultiSelectEditorProps> = ({
  value,
  onChange,
  options,
  loading
}) => {
  const [selected, setSelected] = useState<string[]>(value || []);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
        onChange(selected); // Save when clicked outside
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selected]);

  const toggleOption = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const filteredOptions = options.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="border rounded p-2 cursor-pointer bg-black data-cell-editable"
      >
        {selected.length ? selected.join(", ") : "Select..."}
      </div>

      {isOpen && (
        <div className="absolute w-full bg-black border z-10 mt-1 max-h-40 overflow-auto">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border-b search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {loading ? (
      <div className="p-4 text-gray-500 text-center">Loading users...</div>
    ) : (
      <ul>
        {filteredOptions.map((user) => (
          <li
            key={user.id}
            onClick={() => toggleOption(user.name)}
            className="flex items-center p-2 hover:bg-black-100 cursor-pointer editable-options"
          >
            <input
              type="checkbox"
              checked={selected.includes(user.name)}
              readOnly
              className="mr-2"
            />
            <img src={user.avatarUrl} alt={user.name} className="w-6 h-6 rounded-full mr-2" />
            <span>{user.name}</span>
          </li>
        ))}
      </ul>
    )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectEditor;
