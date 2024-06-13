import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../auth/AuthProvider";
import DefaultLayout from "../layout/DefaultLayout";
import {useState} from "react"
import { API_URL } from "../auth/constants";
import type {AuthResponse, AuthResponseError } from "../types/types";


export default function Login(){
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");
    const auth = useAuth();
    const goTo = useNavigate();
    

    if(auth.isAuthenticated){
        return <Navigate to="/dashboard" />
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
          const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              password,
            }),
          });
          if(response.ok){
            console.log("Usuario encontrado")
            setErrorResponse("");
            const json = (await response.json()) as AuthResponse;

            if (json.body.accessToken && json.body.refreshToken){
              auth.saveUser(json)
            goTo("/dashboard")
            }

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

    return (
        <DefaultLayout>

            <form className="form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                {!!errorResponse && <div className="errorMessage"> {errorResponse}</div>}
                <label>Nombre </label>
                    <input type="text" value ={name} onChange={(e) => setName(e.target.value)}/>
                                
                    <label>Contraseña</label>
                    <input type="password" value ={password} onChange={(e) => setPassword(e.target.value)}/>

                    <button>Login</button>
            </form>

        </DefaultLayout>
    )
}