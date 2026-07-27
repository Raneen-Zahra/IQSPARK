import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RequireAuth from '@/components/RequireAuth';
import DashboardIntro from '@/components/DashboardIntro';
import Link from 'next/link';
import { CATEGORIES, totalQuestionCount } from '@/lib/questions';

export default function HomePage() {
  const totalQuizzes = totalQuestionCount();

  return (
    <>
      <Navbar />
      <RequireAuth>
        <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10">
          <DashboardIntro totalQuizzes={totalQuizzes} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/quiz/${cat.slug}`}
                className="group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--color-yellow)] transition-colors"
              >
                <div
                  className="h-1 w-10 rounded-full mb-4"
                  style={
                    cat.accent === 'mixed'
                      ? {
                          background:
                            'linear-gradient(90deg, var(--color-green), var(--color-yellow), var(--color-red))',
                        }
                      : { background: cat.accent }
                  }
                />
                <h2 className="font-[family-name:var(--font-display)] font-semibold text-lg">
                  {cat.name}
                </h2>
                <p className="text-xs text-[var(--color-muted)] font-[family-name:var(--font-mono)] mt-3">
                  {cat.mcqs.length} questions
                </p>
              </Link>
            ))}
          </div>
        </main>
      </RequireAuth>
      <Footer />
    </>
  );
}
