# GifFinder

Angular 21 (SSR) application.

## Getting started

```bash
npm install
npm start
```

The app runs at `http://localhost:4200/` and reloads on source changes.

## Scripts

| Command                | Description                            |
| ---------------------- | -------------------------------------- |
| `npm start`            | Dev server                             |
| `npm run build`        | Production build into `dist/`          |
| `npm test`             | Unit tests (Vitest)                    |
| `npm run format`       | Format the whole project with Prettier |
| `npm run format:check` | Check formatting without writing       |

## Code style

Prettier is configured in `.prettierrc.json`. A Husky `pre-commit` hook runs
`lint-staged`, which formats staged files automatically.

## SSR

```bash
npm run build
npm run serve:ssr:gif-finder
```
