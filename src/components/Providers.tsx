'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { ResultsProvider } from '@/context/ResultsContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ResultsProvider>{children}</ResultsProvider>
    </AuthProvider>
  );
}
