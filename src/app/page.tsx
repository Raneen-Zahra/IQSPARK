'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-4 bg-[var(--color-black)]">
      <Logo size={72} glow />
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-text)]">
        IQ Spark
      </h1>
      <p className="text-sm text-[var(--color-muted)] font-[family-name:var(--font-mono)]">
        sharpen your mind
      </p>
    </main>
  );
}
