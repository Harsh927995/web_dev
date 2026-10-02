# Khoje Khatam Agent Instructions

## Project Shape

- This is a React 18 + Vite 5 single-page study-resource app for B.Tech students.
- The browser entry point is `src/main.jsx`; it mounts `App` inside `BrowserRouter`.
- Routes currently are `/` and `/branch/:branch`.
- `src/App.jsx` owns search, filters, selected content, profile state, legal modal state, and the main page layout.
- `src/components/` contains focused UI components. Keep state and coordination in the nearest existing parent instead of introducing global state for local behavior.
- `src/pages/BranchSubjects.jsx` handles branch subject and semester navigation.
- `src/data/pyqs.js` is the static content source used by the UI. Preserve its item shape when adding or changing content.
- `src/styles.css` is the shared stylesheet and contains the app's CSS variables and component classes.
- `src/api/` and `src/assets/` may be empty or reserved for future integrations; do not invent an API layer for changes that only need the static dataset.

## Commands

- Install dependencies: `npm install`
- Start development server: `npm run dev`
- Create a production build: `npm run build`
- Preview the production build: `npm run preview`
- Deploy manually to GitHub Pages: `npm run deploy`
- There is currently no test or lint script in `package.json`; do not report tests or lint as available unless you add and verify them.
- CI deploys on pushes to `main` using Node 20, `npm install`, and `npm run build`; the artifact is `dist/`.

## Working Conventions

- Use JavaScript and JSX, matching the existing React style. Avoid introducing TypeScript, a CSS framework, or a state-management library unless the task explicitly requires it.
- Prefer existing components, props, callbacks, CSS variables, and class names over parallel abstractions.
- Keep content changes in `src/data/pyqs.js`; keep filtering and URL-query synchronization in `src/App.jsx`.
- When changing routes or deep links, verify both the route params in `BranchSubjects.jsx` and query params consumed by `App.jsx` (`branch`, `subject`, and `semester`).
- User signup is frontend-only and in-memory. Do not describe it as authenticated or persistent, and never add secrets to client code.
- The year selector props exist in `SearchBar.jsx`, but the visible year control is currently commented out; preserve that behavior unless the task is specifically about enabling it.
- Use semantic controls and preserve keyboard-accessible button and form behavior when editing UI.
- Keep responsive behavior in `src/styles.css`; avoid inline styles for new shared UI unless the surrounding page already uses them.

## Validation

- For UI or data changes, run `npm run build` after editing.
- For navigation changes, manually exercise `/`, a branch route, and a subject query in the dev server when possible.
- Check `git diff --check` before finishing to catch whitespace errors.
- Do not claim a test suite passed when no test script exists.

## Documentation

- [InterviewGuide.md](../InterviewGuide.md) describes the architecture and current behavior.
- [AppExplanation.md](../AppExplanation.md) explains `src/App.jsx`.
- [docs/interview-package.md](../docs/interview-package.md) contains interview and demo material.
- Update documentation only when behavior or project workflow changes; link to existing docs instead of duplicating their content.

## Scope Discipline

- Make the smallest change that fixes the requested behavior.
- Do not rewrite unrelated UI, content, or generated build output.
- Before changing a shared component or data shape, inspect its call sites and run the narrowest available validation, then the production build.

For future instruction improvements, use `/chronicle improve` after enough project sessions have accumulated to reveal recurring friction.
