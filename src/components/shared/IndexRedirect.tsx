import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const IndexRedirect = () => {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role.code === "ADMIN_HR") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/attendance" replace />;
};

export default IndexRedirect;
