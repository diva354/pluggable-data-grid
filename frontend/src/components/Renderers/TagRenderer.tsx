interface TagRendererProps {
    tags?: string[];
    onRemove?: (tag: string) => void;
    value?: string[] | string;
  }
  
  export default function TagRenderer({
    tags,
    onRemove,
    value,
  }: TagRendererProps) {
    const safeTags = tags || (
      Array.isArray(value)
        ? value
        : typeof value === "string"
        ? [value]
        : []
    );
  
    if (!Array.isArray(safeTags)) {
      console.warn(" Invalid tag input:", safeTags);
      return null;
    }
  
    const visibleTags = safeTags.slice(0, 2);
    const hiddenCount = safeTags.length - visibleTags.length;
  
    return (
      <div className="flex flex-wrap gap-2 items-center">
        {visibleTags.map((tag) => (
          <span
            key={tag}
            className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow duration-150"
          >
            {tag}
            {onRemove && (
              <button
                type="button"
                className="ml-1 h-4 w-4 rounded-full bg-white hover:bg-red-100 text-blue-500 hover:text-red-600 text-[10px] flex items-center justify-center leading-[1] p-0"
                onClick={() => onRemove(tag)}
              >
                &times;
              </button>
            )}
          </span>
        ))}
  
        {hiddenCount > 0 && (
          <span 
          className="text-xs text-gray-500 italic"
          title={safeTags.map((u) => u).join(", ")} // Tooltip
          >
            +{hiddenCount} more
          </span>
        )}
      </div>
    );
  }  