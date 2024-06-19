// src/routes/ProtectedRoute.tsx
import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useAuth0 } from "@auth0/auth0-react";

export default function ProtectedRoute() {
  const auth = useAuth();
  const { isAuthenticated: isAuth0Authenticated, isLoading: isAuth0Loading } = useAuth0();

  if (auth.isAuthenticated || isAuth0Authenticated) {
    return <Outlet />;
  }

  if (isAuth0Loading) {
    return <div>Loading...</div>;
  }

  return <Navigate to="/" />;
}
