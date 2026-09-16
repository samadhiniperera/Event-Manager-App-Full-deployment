// Central place for the backend API URL.
// In production (Vercel), set VITE_API_URL in the frontend project's
// Environment Variables to your deployed backend URL, e.g.
//   VITE_API_URL=https://your-backend-project.vercel.app
// Locally, it falls back to your local backend on port 3000.
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
