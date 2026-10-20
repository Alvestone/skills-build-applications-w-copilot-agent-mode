# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## OctoFit API Environment

Define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` for the Codespaces API URL:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

When set, the frontend sends requests to `https://<VITE_CODESPACE_NAME>-8000.app.github.dev/api/[component]/`. When unset, it safely falls back to `http://localhost:8000`. Restart Vite after changing `.env.local`; Vite exposes environment values at build time.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
