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
key. The key is committed on purpose. This is a client-side app calling a public
API, so the key goes out with every request and is visible in the network tab
no matter where it is stored - `.env` files or build-time injection only move it
around, they do not hide it. Giphy issues these keys as public and rate-limits
them; hiding one would require proxying the requests through a backend, which
the SSR server in `src/server.ts` could do if that ever becomes a requirement.

`GiphyApi` never mentions the key: `giphyApiKeyInterceptor` appends it to every
request going to `environment.apiUrl`.

## Scripts

| Command                | Description                            |
| ---------------------- | -------------------------------------- |
| `npm start`            | Dev server                             |
| `npm run build`        | Production build into `dist/`          |
| `npm test`             | Unit tests (Vitest)                    |
| `npm run lint`         | ESLint over scripts and templates      |
| `npm run lint:styles`  | Stylelint over SCSS                    |
| `npm run format`       | Format the whole project with Prettier |
| `npm run format:check` | Check formatting without writing       |

## Structure

```
src
├── app
│   ├── core/interceptors  # Giphy API key
│   ├── features/gifs      # pages, components, API service and models
│   ├── layout/header      # logo + search form
│   └── shared             # Button, TextField, State, pipes, services
└── styles                 # reset, theme tokens, breakpoints
```

Styling is plain SCSS, mobile-first, BEM class names. Colors, spacing, radii,
font sizes, motion and breakpoints live in `src/styles/_theme.scss` — use those
variables instead of hardcoded values.

## Code style

Prettier is configured in `.prettierrc`, ESLint in `eslint.config.js` and
Stylelint in `.stylelintrc.json`. A Husky `pre-commit` hook runs `lint-staged`,
which lints and formats staged files.

## SSR

```bash
npm run build
NG_ALLOWED_HOSTS=localhost npm run serve:ssr:gif-finder
```

Angular rejects requests whose `Host` header is not in `NG_ALLOWED_HOSTS` and
silently falls back to client-side rendering, so the deployed host has to be
listed there.
