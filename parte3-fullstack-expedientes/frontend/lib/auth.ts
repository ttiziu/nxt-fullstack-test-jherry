/**
 * Utilidades para manejo de autenticación
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Realiza el login del usuario
 */
export async function login(username: string, password: string): Promise<{ token: string; username: string }> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error al iniciar sesión');
  }

  const data = await response.json();
  return {
    token: data.token,
    username: data.user.username,
  };
}

/**
 * Guarda el token en una cookie
 */
export function setAuthToken(token: string): void {
  document.cookie = `auth_token=${token}; path=/; max-age=${24 * 60 * 60}; SameSite=Strict`;
}

/**
 * Obtiene el token de la cookie
 */
export function getAuthToken(): string | null {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith('auth_token='));
  
  if (!tokenCookie) return null;
  
  return tokenCookie.split('=')[1];
}

/**
 * Elimina el token de la cookie
 */
export function removeAuthToken(): void {
  document.cookie = 'auth_token=; path=/; max-age=0';
}

/**
 * Verifica si el usuario está autenticado
 */
export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}

