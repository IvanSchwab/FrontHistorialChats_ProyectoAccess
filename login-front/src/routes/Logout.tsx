import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  // Utilizamos la función logout que nos brinda Auth0
  const { logout } = useAuth0();

  return <button onClick={() => logout()}>Cerrar Sesión</button>;
};

export default LogoutButton;
