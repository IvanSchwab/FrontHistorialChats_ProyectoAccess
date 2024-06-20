import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import DefaultLayout from '../layout/DefaultLayout';
import { useState } from 'react';
import { API_URL } from '../auth/constants';
import type { AuthResponse, AuthResponseError } from '../types/types';
import { useAuth0 } from '@auth0/auth0-react';

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorResponse, setErrorResponse] = useState('');
  const auth = useAuth();
  const { loginWithRedirect, isAuthenticated: isAuth0Authenticated, error: auth0Error } = useAuth0();
  const goTo = useNavigate();

  if (auth.isAuthenticated || isAuth0Authenticated) {
    return <Navigate to="/dashboard" />;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          password,
        }),
      });
      if (response.ok) {
        console.log('Usuario encontrado');
        setErrorResponse('');
        const json = (await response.json()) as AuthResponse;

        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
          goTo('/dashboard');
        }
      } else {
        console.log('Algo salió mal');
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DefaultLayout>
      <div className="container">
        <div className="image-box">
          <img src="src/images/acces-logo-transparent-600x600.png" alt="Login image" className="login-image" />
        </div>
        <div className="login-box">
          <form className="form" onSubmit={handleSubmit}>
            <h1 className='title'>Acceder</h1>
            {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
            <div className='input-group'>
              <label>Nombre</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='input-group'>
              <label>Contraseña</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>  
            <div className='login-btn-group'>
              <button>Iniciar sesión</button> 
              <button onClick={() => loginWithRedirect()}>Iniciar con Outlook</button>
            </div>
          </form>
          {auth0Error && <div className="errorMessage">{auth0Error.message}</div>}
        </div>
      </div>
    </DefaultLayout>
  );
}
