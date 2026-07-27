'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LogoutButton() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  function handleLogout() {
    logout();
    router.push('/login');
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-[var(--color-muted)] hover:text-[var(--color-red)] transition-colors"
    >
      Log out
    </button>
  );
}
