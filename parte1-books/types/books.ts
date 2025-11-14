/**
 * Interfaz para representar un autor de un libro
 */
export interface Author {
  name: string;
  birth_year?: number;
  death_year?: number;
}

/**
 * Interfaz para representar un libro obtenido de la API
 */
export interface Book {
  id: number;
  title: string;
  authors: Author[];
}

/**
 * Interfaz para la respuesta completa de la API de Gutendex
 */
export interface GutendexResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Book[];
}

