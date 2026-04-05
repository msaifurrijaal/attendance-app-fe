import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayout from "@/layouts/AppLayout";
import { GuestRoute } from "@/components/shared/GuestRoute";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { RoleRoute } from "@/components/shared/RoleRoute";

const LoginPage = lazy(() => import("../pages/auth/login"));
const DashboardPage = lazy(() => import("../pages/dashboard"));
const DepartmentPage = lazy(() => import("../pages/department"));
const EmployeePage = lazy(() => import("../pages/employee"));

const withLayout = (component: React.ReactNode) => (
  <AppLayout>
    <Suspense fallback={<div>Loading...</div>}>{component}</Suspense>
  </AppLayout>
);

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <GuestRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <LoginPage />
        </Suspense>
      </GuestRoute>
    ),
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute>{withLayout(<DashboardPage />)} </ProtectedRoute>,
  },
  {
    path: "/department",
    element: (
      <ProtectedRoute>
        {withLayout(
          <RoleRoute allowedRoles={["ADMIN_HR"]}>
            <DepartmentPage />
          </RoleRoute>,
        )}
      </ProtectedRoute>
    ),
  },
  {
    path: "/employee",
    element: (
      <ProtectedRoute>
        {withLayout(
          <RoleRoute allowedRoles={["ADMIN_HR"]}>
            <EmployeePage />
          </RoleRoute>,
        )}
      </ProtectedRoute>
    ),
  },
]);
