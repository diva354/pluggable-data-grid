# 🧩 Interactive Data Grid — Fullstack Application

This project is a dynamic **Interactive Data Grid** application built with:

- **Frontend:** React.js + Vite + Tailwind + TypeScript
- **Backend:** Node.js + Express + TypeScript
- **End-to-End Testing:** Cypress (manual run documented)
- **Containerization:** Docker + Docker Compose

✅ Both the frontend and backend are fully Dockerized for easy local setup and deployment.  
✅ Source maps are enabled for easier frontend debugging in production builds.

---

## 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/diva354/pluggable-data-grid.git
cd apps
```

### 2. Build and Run using Docker Compose

```bash
docker-compose up --build
```

✅ This command will:

- Build the backend container
- Build the frontend container
- Start the backend server on `http://localhost:5000`
- Start the frontend app on `http://localhost:4173`
- Health-check the backend automatically before starting frontend

### 3. Access the Application

Open your browser and navigate to:
```bash
http://localhost:4173
```

✅ You should see the Interactive Data Grid UI live!

---

# ✨ Project Features

✅ **Fullstack Application** — Built with React (Vite) frontend and Express (Node.js) backend.

✅ **Dynamic Data Grid** — Columns can dynamically load editors and renderers based on type.

✅ **TypeScript Support** — Full TypeScript setup for both frontend and backend.

✅ **Dockerized** — 
- Both frontend and backend are containerized for consistent environments.
- One command (`docker-compose up`) spins up the entire system.

✅ **Production-Optimized Frontend** — 
- Vite builds static assets.
- Served using a lightweight `serve` server in production.

✅ **Cypress E2E Testing (Manual Setup)** — 
- Ready to run Cypress tests manually.
- Future plan: Dockerize Cypress for fully automated E2E runs.

✅ **Easy Debugging** — 
- Source maps enabled in production builds for easier debugging.

✅ **Future-Ready** — 
- Designed to easily add CI/CD pipelines and staging deployments later.

# 🧠 Project Highlights

## 📌 What This App Does

- **Dynamic Data Grid Generation**:  
  The columns of the grid are dynamically generated based on a configuration file (`config/columns.json`).

- **Type-Based Editor and Renderer Auto-Detection**:  
  For each column, the app automatically assigns the appropriate:
  - **Editor Component** (for editing cell values)
  - **Renderer Component** (for displaying cell content)
  
  depending on the `editorType` and `rendererType` fields defined in `columns.json`.

- **Pluggable Architecture**:  
  Adding a new editor or renderer component only requires creating a new file in the `/components/Editors` or `/components/Renderers` directory, following the naming convention.  
  No manual wiring is needed — everything is automatically picked up via `import.meta.glob` at runtime.

---

## ⚡ Current Performance Optimizations

- **Memoization with `useMemo`**:  
  - The `mappedColumns` array is memoized using `useMemo`.
  - Columns are only recalculated when the original `columns` or `allUsers` (user data) change.
  - Prevents unnecessary remapping and re-rendering of the Data Grid when data has not changed.

- **Stabilized Callbacks with `useCallback`**:  
  - Key callback functions inside the grid are wrapped with `useCallback`.
  - Helps in passing stable function references to deeply nested child components.
  - Prevents unnecessary re-renders in child components that rely on prop equality.

- **Dynamic Import Eagerness**:  
  - Renderer and Editor components are loaded eagerly during app startup.
  - Ensures smooth runtime performance without unexpected lazy-loading behavior in grid editing.

✅ These optimizations collectively ensure the Data Grid remains **responsive**, **efficient**, and **scales well** even with larger datasets or more complex columns.

---

# 🧪 How to Run Cypress Tests

✅ This project uses Cypress for End-to-End (E2E) testing to validate frontend functionality.

Here’s how you can run the Cypress tests manually:

✅ Make sure both services are running first:

- **Frontend** at `http://localhost:4173`
- **Backend** at `http://localhost:5000`

If you are using Docker Compose:

```bash
docker-compose up
```

## Run Cypress Tests

You have two ways to run Cypress tests:


### Option A — Open Cypress GUI Test Runner

```bash
npx cypress open
```
- Opens Cypress in interactive mode (GUI).
- You can manually select which `.cy.ts` tests to run.


### Option B — Run Cypress Tests in Headless Mode
```bash
npx cypress run
```
- Executes all tests automatically in the terminal.
- Useful for CI/CD pipelines and faster local testing.

---


# 🛠️ How to Add a New Editor or Renderer

✅ Adding a new editor or renderer to the Data Grid is extremely simple — no manual wiring needed.

1. **Create a new component** inside the appropriate folder:
   - `/components/Editors/` → for editors (cell editing)
   - `/components/Renderers/` → for renderers (cell display)

2. **Follow the naming convention**:
   - Editor components must end with `Editor.tsx`
   - Renderer components must end with `Renderer.tsx`

   Example:
   - `ColorPickerEditor.tsx`
   - `RatingRenderer.tsx`

3. **The system auto-registers your component**:
   - No need to manually import or configure anything!
   - The app uses `import.meta.glob` to eagerly scan and load all Editors/Renderers at startup.

4. **Reference it in `config/columns.json`**:
   - Use the `editorType` or `rendererType` matching your filename (lowercased).
   
   Example for `ColorPickerEditor.tsx`:
   ```json
   {
     "key": "color",
     "label": "Favorite Color",
     "rendererType": "rating",
     "editorType": "colorpicker"
   }

---

# 🚀 Future Technical Optimizations

While the current application is optimized for medium-sized datasets (assuming ~50-70 rows) and development use cases,  
there are additional enhancements that can make it even more scalable, robust, and production-ready:


## 🔹 Virtualized Rendering for Large Datasets

- Integrate libraries like [`react-virtual`](https://tanstack.com/virtual/latest) or [`react-window`](https://react-window.vercel.app/).
- Only render visible rows and columns in the DOM.
- Dramatically improve frontend performance when dealing with thousands or millions of rows.


## 🔹 Structured Logging

- Replace simple `console.log` with production-grade structured logging libraries like:
  - [`winston`](https://github.com/winstonjs/winston)
  - [`pino`](https://getpino.io/#/)
- Add contextual logs for major backend events (e.g., API calls, errors, healthchecks).


## 🔹 Application Metrics and Monitoring

- Integrate lightweight metrics collection with libraries like [`prom-client`](https://github.com/siimon/prom-client) for the backend.
- Expose `/metrics` endpoint for monitoring request rates, response times, error rates, etc.
- Setup basic Grafana dashboards for real-time observability.


## 🔹 Distributed Tracing

- Add OpenTelemetry instrumentation to backend.
- Automatically trace API calls and database interactions.
- View full end-to-end request traces inside tools like Jaeger or Grafana Tempo.


## 🔹 Error Boundary and Error Reporting

- Extend React ErrorBoundary to catch and log frontend errors gracefully.
- Report frontend errors to services like Sentry or LogRocket for better visibility into runtime issues.


## 🔹 Backend TypeScript Pre-Build for Production

- Use `tsc` to compile backend TypeScript into JavaScript before containerizing.
- Replace `ts-node` runtime with direct `node` execution for faster server startup and lower resource usage.


## 🔹 Environment-Based Configurations

- Use environment variables (`process.env`) for setting backend API URLs, frontend configurations, etc.
- Avoid hardcoding values in code.
- Allow easy switching between dev, staging, and production environments.


## 🔹 API Validation

- Introduce input validation using libraries like [`zod`](https://zod.dev/) or [`joi`](https://joi.dev/).
- Ensure incoming API requests have correct formats and types.


✅ These optimizations will significantly enhance the application's **scalability**, **observability**, **fault tolerance**, and **performance** for real-world, production-grade environments.

---

