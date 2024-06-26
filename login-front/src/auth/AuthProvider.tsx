import { useContext, createContext, useState, useEffect } from "react";
import type { AuthResponse, AccessTokenResponse, User } from "../types/types";
import { API_URL } from "../auth/constants";

interface AuthProviderProps {
  children: React.ReactNode;
}

// Contexto de autenticación para manejar el estado de autenticación y las funciones relacionadas
const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  saveUser: (userData: AuthResponse) => {},
  getRefreshToken: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  // Estado local para almacenar el estado de autenticación, tokens y datos de usuario
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [user, setUser] = useState<User>();

  useEffect(() => {}, []);

  // Función para solicitar un nuevo token de acceso usando un token de actualización
  async function requestNewAccessToken(refreshToken: string) {
    try {
      const response = await fetch(`${API_URL}/refreshToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      if (response.ok) {
        const json = (await response.json()) as AccessTokenResponse;
        if (json.error) {
          throw new Error(json.error);
        }
        return json.body.accessToken;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Función para obtener la información del usuario usando el token de acceso
  async function getUserInfo(accessToken: string) {
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const json = await response.json();
        if (json.error) {
          throw new Error(json.error);
        }
        return json;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Función para verificar el estado de autenticación y renovar el token si es necesario
  async function cheackAuth() {
    if (accessToken) {
      //Usuario ya autenticado
    } else {
      //Usuario no autenticado
      const token = getRefreshToken();
      if (token) {
        const newAccesstoken = await requestNewAccessToken(token);
        if (newAccesstoken) {
          const userInfo = await getUserInfo(newAccesstoken);
          if (userInfo) {
            saveSessionInfo(userInfo, newAccesstoken, token);
          }
        }
      }
    }
  }

  // Función para guardar la información de sesión en el almacenamiento local
  function saveSessionInfo(
    userInfo: User,
    accessToken: string,
    refreshToken: string
  ) {
    setAccessToken(accessToken);
    localStorage.setItem("token", JSON.stringify(refreshToken));
    setIsAuthenticated(true);
    setUser(userInfo);
  }

  function getAccessToken() {
    return accessToken;
  }
  function getRefreshToken(): string | null {
    const token = localStorage.getItem("token") || null;

    if (token) {
      const { refreshToken } = JSON.parse(token);
      return refreshToken;
    }
    return null;
  }

  function saveUser(userData: AuthResponse) {
    saveSessionInfo(
      userData.body.user,
      userData.body.accessToken,
      userData.body.refreshToken
    );
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
