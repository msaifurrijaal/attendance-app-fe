import type { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export const GuestRoute: FC<PropsWithChildren> = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  if (token) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};
