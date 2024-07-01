import React, { useState, useEffect } from 'react';
import './styles/index.css'; // Asegúrate de ajustar la importación si has movido el archivo
import alpayanaLogo from './img/alpayana_logo.png'; // Importa la imagen

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Iniciar Sesión - Alpayana'; // Cambia el título de la página aquí
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      window.location.href = '/dashboard'; // Redirige al dashboard si la autenticación es exitosa
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src={alpayanaLogo} alt="Logo de la empresa" /> {/* Usa la variable importada */}
      </div>
      <form onSubmit={handleSubmit} className="form-signin">
        <div className="placeholder-icon" data-icon="👤">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="placeholder-icon" data-icon="🔒">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ingresar</button>
        <button type="reset">Cancelar</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
