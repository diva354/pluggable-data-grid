import { useEffect, useState } from "react";
import { fetchUsers } from "../../utils/api";
import { CellRendererProps, User } from "../DataGrid/types";
import styles from "./UserEditor.module.scss";

interface UserEditorProps extends CellRendererProps<User[]> {
  onChange: (val: User[]) => void;
}

export default function UserEditor({ value, onChange }: UserEditorProps) {
  const [options, setOptions] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [selected, setSelected] = useState<User[]>(value || []);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);

  useEffect(() => {
    fetchUsers()
      .then((users) => {
        setOptions(users);
        setFiltered(users);
      })
      .catch(() => setError("Failed to fetch users"))
      .finally(() => setLoading(false));
  }, []);

  const toggleUser = (user: User): void => {
    const exists = selected.some((u) => u.id === user.id);
    const updated = exists
      ? selected.filter((u) => u.id !== user.id)
      : [...selected, user];
    setSelected(updated);
    onChange(updated);
  };

  const removeUser = (userId: number): void => {
    const updated = selected.filter((u) => u.id !== userId);
    setSelected(updated);
    onChange(updated);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const text = e.target.value.toLowerCase();
    setSearch(text);
    setFiltered(
      options.filter((user) =>
        user.name.toLowerCase().includes(text)
      )
    );
  };

  const handleToggleSearch = (): void => {
    const toggled = !showSearch;
    setShowSearch(toggled);
    setSearch("");
    setFiltered(toggled ? options : []);
  };

  const usersToShow = search.length > 0 ? filtered : options;

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className={styles["user-editor"]}>
      <div className={styles.header}>
        <strong>Assignees</strong>
        <button onClick={handleToggleSearch} className={styles["toggle-btn"]}>
          {showSearch ? "Collapse" : "Search Users"}
        </button>
      </div>

      {showSearch && (
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={handleSearch}
          className={styles.search}
        />
      )}

      {selected.length > 0 && (
        <div className={styles.selected}>
          {selected.map((user) => (
            <div key={user.id} className={styles.pill}>
              <img src={user.avatarUrl} alt={user.name} />
              {user.name}
              <button onClick={() => removeUser(user.id)}>❌</button>
            </div>
          ))}
        </div>
      )}

      {showSearch && (
        <div className={styles.list}>
          {usersToShow.map((user) => {
            const isSelected = selected.some((u) => u.id === user.id);
            return (
              <div
                key={user.id}
                onClick={() => toggleUser(user)}
                className={`${styles.item} ${isSelected ? styles.selected : ""}`}
              >
                <img src={user.avatarUrl} alt={user.name} />
                <span>{user.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}