import { useEffect, useMemo, useState } from "react";
import DataGrid from "./components/DataGrid/DataGrid";
import { User } from "./components/DataGrid/types"; 
import { fetchUsers } from "./utils/api";
import DefaultRenderer from "./components/Renderers/DefaultRenderer";
import styles from "./App.module.scss";

import { CellRendererProps } from "./components/DataGrid/types";

// Define renderer/editor types
type RendererComponent = (props: CellRendererProps<any>) => JSX.Element;
type EditorComponent = (props: any) => JSX.Element;

// Step 1: Auto-register renderers
const rendererModules = import.meta.glob("./components/Renderers/*.tsx", { eager: true });
const RendererRegistry: Record<string, RendererComponent> = {};

for (const path in rendererModules) {
  const key = path.split("/").pop()?.replace("Renderer.tsx", "").toLowerCase();
  if (key && typeof rendererModules[path].default === "function") {
    RendererRegistry[key] = rendererModules[path].default;
  }
}

// Step 1: Auto-register editors
const editorModules = import.meta.glob("./components/Editors/*.tsx", { eager: true });
const EditorRegistry: Record<string, EditorComponent> = {};

for (const path in editorModules) {
  const key = path.split("/").pop()?.replace("Editor.tsx", "").toLowerCase();
  if (key && typeof editorModules[path].default === "function") {
    EditorRegistry[key] = editorModules[path].default;
  }
}

function App() {
  const [rows, setRows] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [columns, setColumns] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await fetchUsers();
        setAllUsers(users);

        setRows([
          {
            id: 1,
            task: "Fix bug",
            assignees: [users[1]?.name, users[2]?.name],
            volume: 25,
            tag: ["Plasmid", "Protocol"],
            allUsers: users,
          },
          {
            id: 2,
            task: "Write docs",
            assignees: [users[0]?.name, users[1]?.name, users[3]?.name, users[4]?.name],
            volume: 50,
            tag: ["Protocol"],
            allUsers: users,
          },
          {
            id: 4,
            task: "Write docs",
            assignees: [users[3]?.name, users[5]?.name],
            volume: 50,
            tag: ["Protocol"],
            allUsers: users,
          },
          {
            id: 5,
            task: "Write docs",
            assignees: [users[2]?.name, users[4]?.name],
            volume: 50,
            tag: ["Protocol"],
            allUsers: users,
          },
          {
            id: 6,
            task: "Write docs",
            assignees: [users[2]?.name],
            volume: 50,
            tag: ["Protocol"],
            allUsers: users,
          },
          {
            id: 7,
            task: "Write docs",
            assignees: [users[2]?.name],
            volume: 50,
            tag: ["Protocol"],
            allUsers: users,
          },
          {
            id: 8,
            task: "Write docs",
            assignees: [users[2]?.name],
            volume: 50,
            tag: ["Protocol"],
            allUsers: users,
          },
          {
            id: 9,
            task: "Write docs",
            assignees: [users[2]?.name],
            volume: 50,
            tag: ["Protocol"],
            allUsers: users,
          },
          {
            id: 10,
            task: "Write docs",
            assignees: [users[2]?.name],
            volume: 50,
            tag: ["Protocol"],
            allUsers: users,
          },
          {
            id: 11,
            task: "Write docs",
            assignees: [users[2]?.name],
            volume: 50,
            tag: ["Protocol"],
            allUsers: users,
          },
        ]);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setIsLoadingUsers(false);
      }
    };

    loadUsers();
  }, []);



  useEffect(() => {
    const loadColumns = async () => {
      try {
        const module = await import("./config/columns.json");
        setColumns(module.default ?? []);
      } catch (err) {
        console.error("Failed to load columns config:", err);
      }
    };

    loadColumns();
  }, []);


  // Step 2: Inject renderer/editor from registry
  // Step 2: Inject renderer/editor from registry

  const mappedColumns = useMemo(() => {
    if (columns.length === 0) return [];
    
    return (columns as any[]).map((col) => {
      const renderer = col.rendererType ? RendererRegistry[col.rendererType] : DefaultRenderer;
      const editor = col.editorType === null || col.editorType === "readonly"
        ? undefined
        : (props: any) => {
          const EditorComponent = col.editorType
          ? EditorRegistry[col.editorType]
          : EditorRegistry['default']; // fallback to DefaultEditor if missing
            const sharedProps = {
              value: props.value,
              onChange: props.onChange!,
            };
    
            if (col.editorType === "multiselect") {
              return (
                <EditorComponent
                  {...sharedProps}
                  options={allUsers}
                  loading={isLoadingUsers}
                />
              );
            }
    
            if (col.editorType === "tag") {
              return (
                <EditorComponent
                  {...sharedProps}
                  value={Array.isArray(props.value) ? props.value : [props.value]}
                  onChange={props.onChange!}
                  onBlurOutside={props.onBlurOutside}
                />
              );
            }
    
            return <EditorComponent {...sharedProps} />;
          }
  
      return { ...col, renderer, editor };
    });
  }, [columns, allUsers, isLoadingUsers]);

  if (columns.length === 0) {
    return <p>Loading grid configuration...</p>;
  }

   

  return (
    <div className="fixed inset-0 bg-gray-400 flex items-center justify-center px-4">
      <div className={`${styles.wrapper} w-full max-w-[56rem]`}>
        <h1 className={styles.heading}>Dynamic Data Grid</h1>
        <p className="text-gray-600 mb-6">
          Powered by Tailwind, Headless UI, and SCSS Modules.
        </p>

        <div className="bg-black shadow p-4 rounded">
          {error ? (
            <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded-md font-semibold mb-4">
              Error: {error}
            </div>
          ) : (
            <DataGrid
              columns={mappedColumns}
              data={rows}
              onDataChange={setRows}
            />
          )}
        </div>
      </div>
    </div>

  );
}

export default App;
 