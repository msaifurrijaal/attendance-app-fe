import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const LoginPage = lazy(() => import('../pages/auth/login'));

export const router = createBrowserRouter([
  { path: '/login', element: <Suspense fallback={<div>Loading...</div>}><LoginPage /></Suspense> },
]);