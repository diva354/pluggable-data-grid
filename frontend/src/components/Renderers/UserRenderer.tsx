import AvatarGroup from "../AvatarGroup";
import { CellRendererProps, User } from "../DataGrid/types";


const UserRenderer = ({ value, rowData }: CellRendererProps<string[]>) => {
  if (!Array.isArray(value) || value.length === 0) return <span>No assignees</span>;

  const allUsers: User[] = rowData.allUsers || []; // passed via App.tsx rowData

  // Map string names back to full user objects
  const matchedUsers = value
    .map((name) => allUsers.find((u) => u.name === name))
    .filter(Boolean) as User[];

  return <AvatarGroup users={matchedUsers} maxVisible={2} />;
};

export default UserRenderer;