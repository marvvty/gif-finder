# GifFinder

GIF search built on the Giphy API. Angular 21 with SSR, signals and standalone
components.

## Getting started

```bash
npm install
npm start
```

The app runs at `http://localhost:4200/` and reloads on source changes.

## API key

The app talks to the [Giphy API](https://developers.giphy.com/), so it needs a
key.
The key is committed on purpose. This is a client-side app calling a public
API, so the key goes out with every request and is visible in the network tab
no matter where it is stored — `.env` files or build-time injection only move it
around, they do not hide it. Giphy issues these keys as public and rate-limits
them; hiding one would require a backend proxying the requests.

## Scripts

| Command                | Description                            |
| ---------------------- | -------------------------------------- |
| `npm start`            | Dev server                             |
| `npm run build`        | Production build into `dist/`          |
| `npm test`             | Unit tests (Vitest)                    |
| `npm run format`       | Format the whole project with Prettier |
| `npm run format:check` | Check formatting without writing       |

## Structure

```
src/app
├── features/gifs     # pages, components, API service and models
├── layout/header     # logo + search form
├── shared/ui         # Input, Button
└── styles            # reset and theme variables
```

Styling is plain SCSS. Colors, spacing, radii and font sizes live in
`src/styles/_theme.scss` — use those variables instead of hardcoded values.

## Code style

Prettier is configured in `.prettierrc`. A Husky `pre-commit` hook runs
`lint-staged`, which formats staged files automatically.

## SSR

```bash
npm run build
npm run serve:ssr:gif-finder
```
