// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";
import RequireAuth from "./auth/RequireAuth.jsx";
import Login from "./Login.jsx";
import AppShell from "./AppShell.jsx";

function HomeGate() {
  const isAuthed = useIsAuthenticated();
  const loc = useLocation();
  if (isAuthed && loc.pathname === "/") return <Navigate to="/app" replace />;
  if (!isAuthed && loc.pathname === "/") return <Navigate to="/login" replace />;
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeGate />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/app"
          element={
            <RequireAuth>
              <AppShell />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
