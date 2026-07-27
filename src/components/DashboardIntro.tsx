'use client';

import { useAuth } from '@/context/AuthContext';

export default function DashboardIntro({ totalQuizzes }: { totalQuizzes: number }) {
  const { user, userCount } = useAuth();

  return (
    <div className="mb-8">
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
        {user ? `Welcome back, ${user.name.split(' ')[0]}` : 'Choose a category'}
      </h1>
      <p className="text-sm text-[var(--color-muted)] font-[family-name:var(--font-mono)] mt-1">
        {totalQuizzes} questions across 4 categories &middot; {userCount}{' '}
        {userCount === 1 ? 'user' : 'users'} on IQ Spark
      </p>
    </div>
  );
}
