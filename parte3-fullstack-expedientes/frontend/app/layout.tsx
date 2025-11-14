import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gestión de Expedientes - Legal Tech',
  description: 'Sistema de gestión de expedientes con autenticación',
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

