'use client';

import { useState, useEffect } from 'react';
import type { Book, GutendexResponse } from '@/types/books';

/**
 * Componente que muestra una lista de libros obtenidos de la API de Gutendex
 * Muestra los primeros 10 libros con su título y autor principal
 */
export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Función para obtener los libros desde la API
     */
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://gutendex.com/books/?page=1');

        if (!response.ok) {
          throw new Error(`Error al obtener los libros: ${response.status}`);
        }

        const data: GutendexResponse = await response.json();
        
        // Validar que la respuesta tenga la estructura esperada
        if (!data.results || !Array.isArray(data.results)) {
          throw new Error('La respuesta de la API no tiene el formato esperado');
        }
        
        // Obtener solo los primeros 10 libros
        const firstTenBooks = data.results.slice(0, 10);
        setBooks(firstTenBooks);
      } catch (err) {
        setError(
          err instanceof Error 
            ? err.message 
            : 'Ocurrió un error desconocido al cargar los libros'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  /**
   * Estado de carga: muestra un mensaje mientras se obtienen los datos
   */
  if (loading) {
    return (
      <div className="loading-container">
        <p>Cargando libros...</p>
      </div>
    );
  }

  /**
   * Estado de error: muestra un mensaje si hubo un problema al obtener los datos
   */
  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
      </div>
    );
  }

  /**
   * Estado exitoso: muestra la lista de libros
   */
  return (
    <div className="books-container">
      <h2>Lista de Libros</h2>
      <ul className="books-list">
        {books.map((book) => (
          <li key={book.id} className="book-item">
            <div className="book-title">{book.title}</div>
            {book.authors && book.authors.length > 0 && (
              <div className="book-author">
                Autor: {book.authors[0].name}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

