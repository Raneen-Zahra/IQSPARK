'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useResults } from '@/context/ResultsContext';

function scoreColor(score: number) {
  if (score >= 80) return 'var(--color-green)';
  if (score >= 60) return 'var(--color-yellow)';
  return 'var(--color-red)';
}

function buildRemark(overall: number, weakest: string | null) {
  if (overall === 0) return "You haven't completed any quizzes yet — take one to see your results here.";
  if (!weakest) return 'Great consistent performance across categories — keep it up.';
  if (overall >= 80) return `Strong performance overall. ${weakest} is your lowest-scoring area, but you're doing well across the board.`;
  if (overall >= 60) return `Solid progress. ${weakest} could use a bit more practice to bring your overall score up.`;
  return `${weakest} is your weakest area right now — a bit of focused review there should help your overall score the most.`;
}

export default function ProfileContent() {
  const { user } = useAuth();
  const { results, clearHistory } = useResults();
  const [confirming, setConfirming] = useState(false);

  const overall =
    results.length === 0
      ? 0
      : Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length);

  const bySubjectAvg = results.reduce<Record<string, { total: number; count: number }>>(
    (acc, r) => {
      if (!acc[r.subject]) acc[r.subject] = { total: 0, count: 0 };
      acc[r.subject].total += r.score;
      acc[r.subject].count += 1;
      return acc;
    },
    {}
  );

  const subjectAverages = Object.entries(bySubjectAvg).map(([subject, v]) => ({
    subject,
    avg: Math.round(v.total / v.count),
  }));

  const strongest = subjectAverages.length
    ? subjectAverages.reduce((a, b) => (a.avg >= b.avg ? a : b)).subject
    : null;
  const weakest = subjectAverages.length
    ? subjectAverages.reduce((a, b) => (a.avg <= b.avg ? a : b)).subject
    : null;

  function handleClear() {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    clearHistory();
    setConfirming(false);
  }

  return (
    <>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-1">
        Your Profile
      </h1>
      <p className="text-sm text-[var(--color-muted)] mb-8">
        {user?.name} &middot; {user?.email}
      </p>

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
            {results.length}
          </p>
        </div>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5">
          <p className="text-xs text-[var(--color-muted)] font-[family-name:var(--font-mono)]">
            Strongest area
          </p>
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold mt-1">
            {strongest ?? '—'}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="font-[family-name:var(--font-display)] font-semibold text-lg">
          Test history
        </h2>
        {results.length > 0 && (
          <button
            onClick={handleClear}
            className={`text-xs rounded-lg px-3 py-1.5 border transition-colors ${
              confirming
                ? 'bg-[var(--color-red)] text-[var(--color-black)] border-[var(--color-red)] font-semibold'
                : 'text-[var(--color-muted)] border-[var(--color-border)] hover:border-[var(--color-red)] hover:text-[var(--color-red)]'
            }`}
          >
            {confirming ? 'Click again to confirm' : 'Clear history'}
          </button>
        )}
      </div>

      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden mb-8">
        {results.length === 0 ? (
          <p className="text-sm text-[var(--color-muted)] px-5 py-6 text-center">
            No quizzes taken yet.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-[var(--color-muted)] border-b border-[var(--color-border)]">
                <th className="px-5 py-3 font-normal">Subject</th>
                <th className="px-5 py-3 font-normal">Date</th>
                <th className="px-5 py-3 font-normal">Score</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={`${r.subject}-${r.date}-${i}`} className="border-b border-[var(--color-border)] last:border-0">
                  <td className="px-5 py-3">{r.subject}</td>
                  <td className="px-5 py-3 text-[var(--color-muted)] font-[family-name:var(--font-mono)]">
                    {r.date}
                  </td>
                  <td className="px-5 py-3 font-semibold" style={{ color: scoreColor(r.score) }}>
                    {r.score}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5">
        <h2 className="font-[family-name:var(--font-display)] font-semibold text-lg mb-2">
          Remarks
        </h2>
        <p className="text-sm text-[var(--color-muted)]">{buildRemark(overall, weakest)}</p>
      </div>
    </>
  );
}
