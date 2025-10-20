# Ocean Tic Tac Toe (Astro)

Modern, accessible Tic Tac Toe built with Astro. Features:
- 3x3 board with turn logic, win/draw detection, and winning line highlight
- Play modes: Player vs Player and vs Computer (simple AI: center > win/block > random)
- Local scoreboard persisted in localStorage
- Ocean Professional theme styling (blue & amber accents)
- Audit trail scaffold (frontend-only) capturing MOVE, RESET, MODE_CHANGE, ERROR with ISO timestamps and pseudo user id
- Basic validation/error handling in logic functions
- Unit test placeholders via Vitest

## Getting Started

1) Install dependencies
   npm install

2) Run dev server (port 3000)
   npm run dev

3) Build for production
   npm run build

4) Preview production build
   npm run preview

5) Run tests (unit test for game logic)
   npm run test

## Project Structure

- src/pages/index.astro: Top-level page composing the app
- src/components:
  - Board.astro: Interactive board (Astro island)
  - Cell.astro: Square cell component
  - ScoreBoard.astro: Local scoreboard view
  - Controls.astro: Mode toggle and reset control
- src/lib:
  - game.ts: Pure game logic, validation, simple AI
  - storage.ts: localStorage utilities for scores and pseudo user id
  - audit.ts: audit trail scaffold (local)
- src/styles/theme.css: Ocean Professional theme
- src/tests/game.test.ts: Vitest unit tests for game logic

## Accessibility

- Keyboard support: Tab to focus cells, Enter/Space to move
- ARIA labels on controls and dynamic status regions

## GxP and Compliance Notes

This repository includes a lightweight, frontend-only audit trail scaffold:
- Events: MOVE, RESET, MODE_CHANGE, ERROR
- Metadata: ISO timestamp, pseudo user id, payload snapshots (before/after where applicable)
- Storage: localStorage (best-effort, not validated/persistent beyond browser storage guarantees)

Important:
- This is not a replacement for a validated, server-side audit trail.
- No electronic signatures or role-based access are implemented (no backend).
- The audit scaffold is for demonstration and traceability during UI interactions.

## Known Limitations

- No backend or multi-user sync; gameplay and audit events occur only in the browser context.
- Scores and audit events are not encrypted at rest in localStorage.

## License

MIT
