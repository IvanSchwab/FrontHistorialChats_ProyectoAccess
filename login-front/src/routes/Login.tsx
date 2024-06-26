import type { AuthResponse, AuthResponseError } from "../types/types";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useState } from "react";
import { API_URL } from "../auth/constants";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState(""); // Estado para el nombre de usuario
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [errorResponse, setErrorResponse] = useState(""); // Estado para manejar respuestas de error
  const auth = useAuth();
  const {
    //(Autenticación con Auth0)
    loginWithRedirect, // Función para iniciar sesión con redirección
    isAuthenticated: isAuth0Authenticated, // Estado de autenticación
    error: auth0Error, // Error de autenticación
  } = useAuth0();
  const goTo = useNavigate();

  // Redirige a Dashboard si ya está autenticado
  if (auth.isAuthenticated || isAuth0Authenticated) {
    return <Navigate to="/dashboard" />;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        // Petición POST para iniciar sesión
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          password,
        }),
      });
      if (response.ok) {
        console.log("Usuario encontrado");
        setErrorResponse("");
        const json = (await response.json()) as AuthResponse;

        // Si se obtiene accessToken y refreshToken, guarda la sesión y redirige a Dashboard
        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json); // Guarda la información del usuario en el contexto de autenticación
          goTo("/dashboard"); // Navega a la página de Dashboard
        }
      } else {
        console.log("Algo salió mal");
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="image-box">
        <img
          src="src/images/acces-logo-transparent-600x600.png"
          alt="Login image"
          className="login-image"
        />
      </div>
      <div className="login-box">
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="title">Acceder</h1>
          {!!errorResponse && (
            <div className="errorMessage">{errorResponse}</div>
          )}
          <div className="input-group">
            <label>Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login-btn-group">
            <button>Iniciar sesión</button>
            <button onClick={() => loginWithRedirect()}>
              Iniciar con Outlook
            </button>
          </div>
        </form>
        <Link to="/signup">
          <button className="btn-send2register">
            <p>Registrarse</p>
            <img
              className="icon-arrow-w"
              src="src/images/inside-circle-arrow-25-white.png"
              alt="arrow white"
            />
            <img
              className="icon-arrow-b"
              src="src/images/inside-circle-arrow-25-blue.png"
              alt="arrow blue"
            />
          </button>
        </Link>
        {auth0Error && <div className="errorMessage">{auth0Error.message}</div>}
      </div>
    </div>
  );
}
