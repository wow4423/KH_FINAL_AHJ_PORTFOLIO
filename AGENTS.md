# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio project (AHJ Portfolio) — a monorepo with a React frontend and a Spring Boot backend.

- **Frontend**: `front/app/` — React 19 SPA built with Vite, deployed to GitHub Pages
- **Backend**: `Portfo/` — Spring Boot 4.1 / Java 21 / PostgreSQL (minimal, mostly scaffolded)

The frontend is the primary active application. It deploys automatically to GitHub Pages on push to `master` via `.github/workflows/deploy.yml`.

## Frontend Commands

All commands run from `front/app/`:

```bash
cd front/app
npm install       # install dependencies
npm run dev       # start dev server (http://localhost:5173)
npm run build     # production build → dist/
npm run lint      # run ESLint
npm run preview   # preview production build locally
```

**Base path**: `/KH_FINAL_AHJ_PORTFOLIO/` (set in `vite.config.js` for GitHub Pages deployment).

## Backend Commands

Run from `Portfo/`:

```bash
./gradlew bootRun    # start Spring Boot dev server
./gradlew build      # compile and package
./gradlew test       # run tests
```

Requires Java 21. Minimal configuration — `application.properties` only sets the app name; DB and other config would need to be added.

## Frontend Architecture

**Stack**: React 19, React Router v7, Redux Toolkit, Axios, Styled Components, Vite

Key libraries in use:
- **State**: Redux Toolkit + React-Redux
- **Routing**: React Router v7
- **HTTP**: Axios
- **Styling**: Styled Components + CSS files
- **UI**: FullCalendar, Recharts, React Quill (rich text)
- **Real-time**: STOMP WebSocket (`@stomp/stompjs`, `sockjs-client`)
- **Auth**: `jwt-decode`
- **Address**: Daum Postcode (Korean address search)

**Entry point**: `front/app/src/main.jsx` → `App.jsx`  
**Layout**: `src/app/layouts/DefaultLayout.jsx` with header/footer  
**Pages**: `src/pages/` (currently `home/`)  
**Assets**: `src/assets/images/` (project images, stack logos)
