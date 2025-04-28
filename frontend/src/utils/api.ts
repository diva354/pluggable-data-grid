import { User } from "../components/DataGrid/types";

export async function fetchUsers(): Promise<User[]> {
    try {
        const res = await fetch("http://localhost:3001/api/users");
        if (!res.ok) throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
        return await res.json();

    }
    catch (err) {
        // Safely extract error message
        if (err instanceof Error) {
          throw new Error(`fetchUsers error: ${err.message}`);
        } else {
          throw new Error("Unknown error occurred while fetching users");
        }
      }

}
  