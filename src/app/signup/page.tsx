'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Placeholder: real auth wiring comes later.
    router.push('/home');
  }

  return (
    <main className="flex-1 flex items-center justify-center bg-[var(--color-black)] px-6 py-12">
      <div className="w-full max-w-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8">
        <div className="flex items-center gap-2 mb-1">
          <Logo size={24} />
          <span className="font-[family-name:var(--font-display)] font-semibold">IQ Spark</span>
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-xl font-semibold mt-4 mb-6">
          Create your account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-[var(--color-muted)]">Name</span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[var(--color-black)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-[var(--color-yellow)]"
              placeholder="Your name"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-[var(--color-muted)]">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[var(--color-black)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-[var(--color-yellow)]"
              placeholder="you@example.com"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-[var(--color-muted)]">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[var(--color-black)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-[var(--color-yellow)]"
              placeholder="At least 6 characters"
            />
          </label>

          <button
            type="submit"
            className="mt-2 bg-[var(--color-green)] text-[var(--color-black)] font-semibold rounded-lg py-2.5 text-sm hover:brightness-110 transition"
          >
            Sign up
          </button>
        </form>

        <p className="mt-6 text-sm text-[var(--color-muted)] text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-[var(--color-yellow)] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
