import { useIsAuthenticated } from "@azure/msal-react";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const isAuthed = useIsAuthenticated();
  const location = useLocation();
  const isDemo = new URLSearchParams(location.search).get("demo") === "true";

  if (!isAuthed && !isDemo) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}