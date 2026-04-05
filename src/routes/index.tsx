import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayout from "@/layouts/AppLayout";

const LoginPage = lazy(() => import("../pages/auth/login"));
const DashboardPage = lazy(() => import("../pages/dashboard"));
const DepartmentPage = lazy(() => import("../pages/department"));

const withLayout = (Component: React.ComponentType) => (
  <AppLayout>
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  </AppLayout>
);

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: withLayout(DashboardPage),
  },
  {
    path: "/departments",
    element: withLayout(DepartmentPage),
  },
]);
