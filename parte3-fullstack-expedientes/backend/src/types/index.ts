/**
 * Interfaz para un expediente
 */
export interface Expediente {
  id: string;
  nombre: string;
  descripcion: string;
  estado: 'Activo' | 'En progreso' | 'Cerrado';
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Interfaz para la petición de login
 */
export interface LoginRequest {
  username: string;
  password: string;
}

/**
 * Interfaz para la respuesta de login
 */
export interface LoginResponse {
  token: string;
  user: {
    username: string;
  };
}

/**
 * Interfaz para el payload del JWT
 */
export interface JWTPayload {
  username: string;
}

