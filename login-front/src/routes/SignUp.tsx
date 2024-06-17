import DefaultLayout from "../layout/DefaultLayout";
import { API_URL } from "../auth/constants";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import type { AuthResponseError } from "../types/types";

export default function SignUp() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const auth = useAuth();
  const goTo = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          mail,
          password,
        }),
      });
      if(response.ok){
        console.log("Usuario creado")
        setErrorResponse("");

        goTo("/")
      } else{
        console.log("Algo salió mal")
        const json = await  response.json() as AuthResponseError;
        setErrorResponse(json.body.error);
        return;
      }
    } catch (error) {
        console.log(error)
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <DefaultLayout>
  <div className="container">
    <div className="image-box">
      <img src="src/images/LogoAccess.png" alt="Sign up image" className="signup-image" />
    </div>
    <div className="login-box">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Registrarse</h1>
        {!!errorResponse && <div className="errorMessage"> {errorResponse}</div>}
        <label>Nombre</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Mail</label>
        <input type="text" value={mail} onChange={(e) => setMail(e.target.value)} />
        <label>Contraseña</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button>Crear usuario</button>
      </form>
    </div>
  </div>
</DefaultLayout>
  );
}
