import BooksList from '@/components/BooksList';

export default function Home() {
  return (
    <main className="main-container">
      <header className="header">
        <h1>Biblioteca de Libros</h1>
        <p>Lista de los primeros 10 libros disponibles en Gutendex</p>
      </header>
      <BooksList />
    </main>
  );
}

