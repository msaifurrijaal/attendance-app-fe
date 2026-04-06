import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayout from "@/layouts/AppLayout";
import { GuestRoute } from "@/components/shared/GuestRoute";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { RoleRoute } from "@/components/shared/RoleRoute";

const LoginPage = lazy(() => import("../pages/auth/login"));
const DashboardPage = lazy(() => import("../pages/dashboard"));
const DepartmentPage = lazy(() => import("../pages/department"));
const EmployeePage = lazy(
  () => import("../pages/employee/features/list-employee"),
);
const AddEmployeePage = lazy(
  () => import("../pages/employee/features/add-employee"),
);
const EditEmployeePage = lazy(
  () => import("../pages/employee/features/edit-employee"),
);
const AttendancePage = lazy(() => import("../pages/attendance"));

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
    children: [
      {
        index: true,
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
      {
        path: "/employee/add",
        element: (
          <ProtectedRoute>
            {withLayout(
              <RoleRoute allowedRoles={["ADMIN_HR"]}>
                <AddEmployeePage />
              </RoleRoute>,
            )}
          </ProtectedRoute>
        ),
      },
      {
        path: "/employee/edit/:id",
        element: (
          <ProtectedRoute>
            {withLayout(
              <RoleRoute allowedRoles={["ADMIN_HR"]}>
                <EditEmployeePage />
              </RoleRoute>,
            )}
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/attendance",
    element: <ProtectedRoute>{withLayout(<AttendancePage />)}</ProtectedRoute>,
  },
]);
