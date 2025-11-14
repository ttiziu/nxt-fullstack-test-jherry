'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, setAuthToken } from '@/lib/auth';

/**
 * Página de login con formulario de autenticación
 */
export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validaciones
      if (!username.trim()) {
        setError('El usuario es requerido');
        setLoading(false);
        return;
      }

      if (!password) {
        setError('La contraseña es requerida');
        setLoading(false);
        return;
      }

      // Realizar login
      const { token } = await login(username, password);

      // Guardar token en cookie
      setAuthToken(token);

      // Redirigir al dashboard
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Gestión de Expedientes</h1>
        <p className="subtitle">Sistema Legal Tech</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              disabled={loading}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="demo-credentials">
          <p><strong>Credenciales de prueba:</strong></p>
          <p>Usuario: <code>admin</code> / Contraseña: <code>admin123</code></p>
          <p>Usuario: <code>user</code> / Contraseña: <code>user123</code></p>
        </div>
      </div>
    </div>
  );
}

