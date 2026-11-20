# Sculptures

A small React app for browsing and managing sculptures with React Context and Neon.

## Features

- **Home** (`SculpturesPage.jsx`): browse the sculptures one by one
- **Add** (`SculpturesAdd.jsx`): add a new sculpture using a form
- **Remove** (`SculpturesRemove.jsx`): delete sculptures from the list
- **Filter by year** (`SculpturesFilteredByYear.jsx`): show sculptures from a given year
- **Shared state** (`SculpturesContext.jsx`): loads and updates the list through Neon
- **Menu** (`App.jsx`): navigate between pages with React Router

[View the colorful component tree diagram](./docs/component-tree.html).

The `sculptures` Neon table is the source of truth. The provider starts with an empty
list and loads the table; it requires an `id` column and columns matching the sculpture
form fields.

## Repository structure

```
sculptures/            ← git root
├── docs/              ← exercise statement + screenshots (not part of the app)
│   ├── exercise.md
│   └── *.png
└── sculptures/        ← Vite + React app
    ├── index.html
    ├── vite.config.js
    ├── eslint.config.js
    ├── package.json
    ├── public/
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── Sculptures*.jsx
        └── SculpturesContext.jsx
```

The docs are kept **outside** the code project on purpose, so the app folder contains only code.

## Getting started

Run these from the inner app folder:

```bash
cd sculptures
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build locally
npm run lint      # ESLint
```

## Migration: CodeSandbox / CRA → Vite

The project began as a **CodeSandbox** template built on **Create React App** (`react-scripts`). In commit `8b92cdb` it was rebuilt from scratch with **Vite**. All of this happened on `main`.

### What changed

| | Before (CRA / CodeSandbox) | After (Vite) |
|---|---|---|
| Location | repo root | `sculptures/` subfolder |
| Tooling | `react-scripts` 5 | `vite` 8 + `@vitejs/plugin-react` |
| Entry point | `src/index.js` | `src/main.jsx` |
| HTML | `public/index.html` | `index.html` (project root) |
| Root component | `src/App.js` | `src/App.jsx` |
| Styles | `src/styles.css` | `src/index.css`, `src/App.css` |
| Scripts | `start`, `build`, `test`, `eject` | `dev`, `build`, `preview`, `lint` |
| Build output | `build/` | `dist/` |
| Lockfiles | `package-lock.json` + `pnpm-lock.yaml` | `package-lock.json` only |
| Linting | CRA built-in | `eslint.config.js` (flat config) |
| Extras | `.codesandbox/tasks.json` | React Compiler (`babel-plugin-react-compiler`) |

### What did not change

The sculpture UI was moved over and adapted to use a shared React context backed by Neon. `App.js` was renamed to `App.jsx`, because Vite requires JSX to be in `.jsx` files.

### Why Vite

- Much faster dev server startup and HMR
- CRA (`react-scripts`) is deprecated and no longer maintained
- Simpler, explicit configuration (`vite.config.js`)

The previous CRA version can still be found in git history before commit `8b92cdb`.
