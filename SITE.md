# ThrowTop Site Reference

> For AI agents: read this file before editing the site. It is the project map,
> not a full design document. Keep it short and update it when the structure or
> release flow changes.

## Project Overview

This is the static website for `throwtop.dev`, hosted on GitHub Pages.

The site is intentionally small:

- A profile/sidebar with social links.
- Project cards.
- CS2 settings.
- PC/setup details.
- A copy card for the PowerShell backup command.

The public backup command is:

```powershell
irm throwtop.dev/backup | iex
```

Do not introduce alternate public backup URLs unless explicitly requested.

## Project Layout

- `index.html` is the Vite HTML entrypoint. Keep it minimal.
- `src/data.js` contains editable site content: profile, links, projects, settings, setup specs, and schema data.
- `src/main.js` renders the page and owns interactive behavior such as copy buttons and proximity glow.
- `src/styles.css` imports Tailwind v4 with `@import "tailwindcss"` and contains custom CSS.
- `public/` contains static files copied directly into the built site, including `CNAME`, `.nojekyll`, and images.
- `backup.ps1` is the readable source for the PowerShell backup script.
- `backup` is the generated extensionless release file for `throwtop.dev/backup`.
- `scripts/release-scripts.mjs` copies `backup.ps1` to `backup` and `dist/backup`.
- `vite.config.js` registers `@tailwindcss/vite`.
- `.github/workflows/deploy.yml` builds the site and deploys `dist` with the official GitHub Pages actions.

Do not edit generated `dist/` output by hand.

## Build and Deploy

Local development:

```powershell
npm run dev
```

Production build:

```powershell
npm run build
```

The production build:

1. Runs Vite.
2. Compiles Tailwind v4 through the Vite plugin into minified hashed CSS.
3. Minifies and hashes JavaScript.
4. Copies `backup.ps1` to `backup`.
5. Copies `backup.ps1` to `dist/backup`.

GitHub Actions deploys on pushes to `main` using `.github/workflows/deploy.yml`.
The workflow uses current official action majors for checkout, Node setup, Pages
configuration, artifact upload, and deployment. The repository Pages setting must
use GitHub Actions as the source for this to publish `dist`.

## Backup Script Release Flow

`backup.ps1` is the source of truth. It exists so the script opens naturally as a
PowerShell file in editors.

`backup` is the published compatibility path. It must remain extensionless
because users run:

```powershell
irm throwtop.dev/backup | iex
```

After changing `backup.ps1`, run:

```powershell
npm run release:scripts
```

or run the full build:

```powershell
npm run build
```

Verify the script parses before committing script changes:

```powershell
pwsh -NoProfile -Command "[scriptblock]::Create((Get-Content -Raw .\backup.ps1)) | Out-Null"
```

## Editing Rules

- Keep the visual style close to the current site unless asked for redesign.
- Add or edit content in `src/data.js` when possible.
- Keep `index.html` as a small shell for Vite.
- Keep custom styling in `src/styles.css`.
- Do not add `tailwind.config.js` or PostCSS config unless a real Tailwind
  feature requires it. This project uses Tailwind v4's Vite plugin path.
- Avoid useless comments.
- Use ASCII in code and docs unless the existing content requires otherwise.
- Do not add new public script URLs unless requested.
- Do not touch `ra` unless the task specifically asks for it.

## Common Tasks

Add a project:

1. Edit `projects` in `src/data.js`.
2. Use `href` for a link card or `command` for a copy card.
3. Run `npm run build`.

Update setup or CS2 settings:

1. Edit `setup` or `cs2Settings` in `src/data.js`.
2. Run `npm run build`.

Update the backup script:

1. Edit `backup.ps1`.
2. Run the PowerShell parse check.
3. Run `npm run build`.
4. Confirm `backup.ps1`, `backup`, and `dist/backup` match.

## Current Caveats

- GitHub Pages was previously configured as legacy branch publishing from
  `main` root. The workflow is present, but Pages must be set to GitHub Actions
  in repository settings for `dist` deployment.
- `ra` had an existing local modification before the Vite migration work. Treat
  it as unrelated unless explicitly asked.
