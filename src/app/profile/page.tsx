import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TEST_HISTORY = [
  { subject: 'Verbal Reasoning', date: '2026-07-20', score: 82 },
  { subject: 'Current Affairs', date: '2026-07-18', score: 64 },
  { subject: 'Non-Verbal Reasoning', date: '2026-07-14', score: 91 },
  { subject: 'General Knowledge', date: '2026-07-09', score: 73 },
];

function scoreColor(score: number) {
  if (score >= 80) return 'var(--color-green)';
  if (score >= 60) return 'var(--color-yellow)';
  return 'var(--color-red)';
}

export default function ProfilePage() {
  const overall = Math.round(
    TEST_HISTORY.reduce((sum, t) => sum + t.score, 0) / TEST_HISTORY.length
  );

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-1">
          Your Profile
        </h1>
        <p className="text-sm text-[var(--color-muted)] mb-8">Raneen &middot; @Arhazel</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5">
            <p className="text-xs text-[var(--color-muted)] font-[family-name:var(--font-mono)]">
              Overall score
            </p>
            <p
              className="font-[family-name:var(--font-display)] text-3xl font-bold mt-1"
              style={{ color: scoreColor(overall) }}
            >
              {overall}%
            </p>
          </div>
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5">
            <p className="text-xs text-[var(--color-muted)] font-[family-name:var(--font-mono)]">
              Tests taken
            </p>
            <p className="font-[family-name:var(--font-display)] text-3xl font-bold mt-1">
              {TEST_HISTORY.length}
            </p>
          </div>
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5">
            <p className="text-xs text-[var(--color-muted)] font-[family-name:var(--font-mono)]">
              Strongest area
            </p>
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold mt-1">
              Non-Verbal Reasoning
            </p>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-display)] font-semibold text-lg mb-3">
          Test history
        </h2>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-[var(--color-muted)] border-b border-[var(--color-border)]">
                <th className="px-5 py-3 font-normal">Subject</th>
                <th className="px-5 py-3 font-normal">Date</th>
                <th className="px-5 py-3 font-normal">Score</th>
              </tr>
            </thead>
            <tbody>
              {TEST_HISTORY.map((t) => (
                <tr key={t.subject + t.date} className="border-b border-[var(--color-border)] last:border-0">
                  <td className="px-5 py-3">{t.subject}</td>
                  <td className="px-5 py-3 text-[var(--color-muted)] font-[family-name:var(--font-mono)]">
                    {t.date}
                  </td>
                  <td className="px-5 py-3 font-semibold" style={{ color: scoreColor(t.score) }}>
                    {t.score}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5">
          <h2 className="font-[family-name:var(--font-display)] font-semibold text-lg mb-2">
            Remarks
          </h2>
          <p className="text-sm text-[var(--color-muted)]">
            Strong performance in Non-Verbal Reasoning. Current Affairs is your lowest-scoring
            area — a bit more time reading recent news summaries before your next attempt should
            help close that gap.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
