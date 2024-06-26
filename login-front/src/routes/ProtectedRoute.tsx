import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useAuth0 } from "@auth0/auth0-react";

export default function ProtectedRoute() {
  const auth = useAuth(); // Obtiene el estado de autenticación local
  const { isAuthenticated: isAuth0Authenticated, isLoading: isAuth0Loading } =
    useAuth0();

  // Verifica si el usuario está autenticado localmente o mediante Auth0
  // Y de ser así lo renderiza las subrutas definidas
  if (auth.isAuthenticated || isAuth0Authenticated) {
    return <Outlet />;
  }

  // Muestra un mensaje de carga mientras se verifica la autenticación con Auth0
  if (isAuth0Loading) {
    return <div className="loading-message">Cargando...</div>;
  }

  // Si el usuario no está autenticado, redirige a la página de inicio
  return <Navigate to="/" />;
}
