import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const CATEGORIES = [
  {
    name: 'Verbal Reasoning',
    slug: 'verbal',
    description: 'Analogies, comprehension, and word logic.',
    quizzes: 14,
    accent: 'var(--color-green)',
  },
  {
    name: 'Non-Verbal Reasoning',
    slug: 'non-verbal',
    description: 'Pattern recognition and spatial puzzles.',
    quizzes: 11,
    accent: 'var(--color-yellow)',
  },
  {
    name: 'Current Affairs',
    slug: 'current-affairs',
    description: 'Stay sharp on what is happening globally.',
    quizzes: 9,
    accent: 'var(--color-red)',
  },
  {
    name: 'General Knowledge',
    slug: 'gk',
    description: 'A broad mix across every subject area.',
    quizzes: 20,
    accent: 'mixed',
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Choose a category
          </h1>
          <p className="text-sm text-[var(--color-muted)] font-[family-name:var(--font-mono)] mt-1">
            54 quizzes &middot; 12,480 users on IQ Spark
          </p>
        </div>

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
              <p className="text-sm text-[var(--color-muted)] mt-1">{cat.description}</p>
              <p className="text-xs text-[var(--color-muted)] font-[family-name:var(--font-mono)] mt-3">
                {cat.quizzes} quizzes
              </p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
