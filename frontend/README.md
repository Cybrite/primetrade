# PrimeTrade Frontend

React-based frontend for the PrimeTrade task management application with JWT authentication.

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env`:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

3. Start development server:

```bash
npm run dev
```

## Features

- User Authentication (Login/Register)
- Protected Routes with JWT
- Task Management Dashboard
- CRUD Operations for Tasks
- Responsive Design
- Real-time Error/Success Feedback
- Task Filtering by Status
- Modal-based Task Forms

## Tech Stack

- React 19.2.0
- Vite 7.3.1
- React Router DOM 6.21.1
- Axios 1.6.5
- CSS3 (Custom Styling)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Setup

Make sure the backend API is running at `http://localhost:5000` before starting the frontend.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
