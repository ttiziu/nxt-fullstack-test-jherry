import { redirect } from 'next/navigation';

/**
 * Página principal que redirige al login
 */
export default function Home() {
  redirect('/login');
}

