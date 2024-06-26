import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./routes/SignUp.tsx";
import Dashboard from "./routes/Dashboard.tsx";
import Login from "./routes/Login.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from "./auth/constants";

// Creación del enrutador
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <div>Error</div>,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <div>Error</div>,
  },
  {
    path: "/", // Ruta protegida que muestra el componente ProtectedRoute, que renderiza el Dashboard si el usuario está autenticado
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard", // Ruta hija de la ruta protegida, muestra el componente Dashboard
        element: <Dashboard />,
      },
    ],
    errorElement: <div>Error</div>,
  },
]);

const onRedirectCallback = (appState: any) => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Auth0Provider
        domain={AUTH0_DOMAIN}
        clientId={AUTH0_CLIENT_ID}
        authorizationParams={{ redirect_uri: window.location.origin }}
        onRedirectCallback={onRedirectCallback}
      >
        <RouterProvider router={router} />
      </Auth0Provider>
    </AuthProvider>
  </React.StrictMode>
);
