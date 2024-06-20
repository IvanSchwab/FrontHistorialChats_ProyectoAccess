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
      <img src="src/images/acces-logo-transparent-600x600.png" alt="Login image" className="login-image" />
    </div>
    <div className="login-box">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className='title-r'>Registrarse</h1>
        {!!errorResponse && <div className="errorMessage"> {errorResponse}</div>}
        <div className='input-group'>
          <label>Nombre</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='input-group'>
          <label>Mail</label>
          <input type="text" value={mail} onChange={(e) => setMail(e.target.value)} />
        </div>
        <div className='input-group'>
          <label>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='login-btn-group'>
          <button>Crear usuario</button>
        </div>
      </form>
    </div>
  </div>
</DefaultLayout>
  );
}
