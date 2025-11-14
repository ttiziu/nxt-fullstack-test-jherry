import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lista de Libros - Gutendex',
  description: 'Aplicación que muestra una lista de libros obtenidos de la API de Gutendex',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

