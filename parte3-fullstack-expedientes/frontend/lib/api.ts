import { getAuthToken } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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
 * Realiza una petición autenticada al backend
 */
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getAuthToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error en la petición');
  }

  return response.json();
}

/**
 * Obtiene todos los expedientes
 */
export async function getExpedientes(): Promise<Expediente[]> {
  const data = await fetchWithAuth(`${API_URL}/api/expedientes`);
  return data.expedientes;
}

/**
 * Obtiene un expediente por ID
 */
export async function getExpediente(id: string): Promise<Expediente> {
  const data = await fetchWithAuth(`${API_URL}/api/expedientes/${id}`);
  return data.expediente;
}

/**
 * Crea un nuevo expediente
 */
export async function createExpediente(expediente: Omit<Expediente, 'id' | 'createdAt' | 'updatedAt'>): Promise<Expediente> {
  const data = await fetchWithAuth(`${API_URL}/api/expedientes`, {
    method: 'POST',
    body: JSON.stringify(expediente),
  });
  return data.expediente;
}

/**
 * Actualiza un expediente
 */
export async function updateExpediente(id: string, expediente: Partial<Omit<Expediente, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Expediente> {
  const data = await fetchWithAuth(`${API_URL}/api/expedientes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(expediente),
  });
  return data.expediente;
}

/**
 * Elimina un expediente
 */
export async function deleteExpediente(id: string): Promise<void> {
  await fetchWithAuth(`${API_URL}/api/expedientes/${id}`, {
    method: 'DELETE',
  });
}

