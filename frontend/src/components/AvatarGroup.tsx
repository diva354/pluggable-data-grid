// AvatarGroup.tsx
import React from "react";
import styles from "./AvatarGroup.module.scss"; // or Tailwind if you prefer

interface User {
  id: number;
  name: string;
  avatarUrl: string;
}

interface Props {
  users: User[];
  maxVisible?: number;
}

const AvatarGroup: React.FC<Props> = ({ users, maxVisible = 3 }) => {
  const visibleUsers = users.slice(0, maxVisible);
  const hiddenUsers = users.slice(maxVisible);

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {visibleUsers.map((user) => (
        <div
          key={user.id}
          className="flex items-center px-2 py-1 border rounded-full shadow-sm bg-vlack-100"
          title={user.name} // Tooltip
        >
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="text-sm">{user.name}</span>
        </div>
      ))}

      {hiddenUsers.length > 0 && (
        <div
          className="px-2 py-1 border rounded-full bg-black-200 text-sm cursor-default"
          title={hiddenUsers.map((u) => u.name).join(", ")} // Tooltip
        >
          +{hiddenUsers.length} more
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
