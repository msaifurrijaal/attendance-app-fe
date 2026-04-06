import { Navigate } from "react-router-dom";
import type { FC, PropsWithChildren } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  allowedRoles: string[];
}

export const RoleRoute: FC<PropsWithChildren<Props>> = ({
  children,
  allowedRoles,
}) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role.code))
    return <Navigate to="/" replace />;
  return <>{children}</>;
};
