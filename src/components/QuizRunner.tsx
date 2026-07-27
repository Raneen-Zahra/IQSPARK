'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Category } from '@/lib/questions';
import { useResults } from '@/context/ResultsContext';
import RequireAuth from './RequireAuth';

export default function QuizRunner({ category }: { category: Category }) {
  return (
    <RequireAuth>
      <QuizRunnerInner category={category} />
    </RequireAuth>
  );
}

function QuizRunnerInner({ category }: { category: Category }) {
  const router = useRouter();
  const { addResult } = useResults();

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [brainstormAnswer, setBrainstormAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  function selectAnswer(questionId: string, optionIndex: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }

  function handleSubmit() {
    const correctCount = category.mcqs.filter(
      (q) => answers[q.id] === q.correctIndex
    ).length;
    const percentage = Math.round((correctCount / category.mcqs.length) * 100);
    setScore(percentage);
    setSubmitted(true);

    addResult({
      subject: category.name,
      categorySlug: category.slug,
      date: new Date().toISOString().slice(0, 10),
      score: percentage,
    });
  }

  const allAnswered = category.mcqs.every((q) => answers[q.id] !== undefined);

  if (submitted) {
    return (
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 text-center">
        <p className="text-xs text-[var(--color-muted)] font-[family-name:var(--font-mono)] mb-2">
          Your score
        </p>
        <p className="font-[family-name:var(--font-display)] text-4xl font-bold mb-4">
          {score}%
        </p>
        <button
          onClick={() => router.push('/profile')}
          className="bg-[var(--color-green)] text-[var(--color-black)] font-semibold rounded-lg px-5 py-2.5 text-sm hover:brightness-110 transition"
        >
          View in profile
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {category.mcqs.map((q, i) => (
        <div
          key={q.id}
          className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5"
        >
          <p className="text-sm font-medium mb-3">
            {i + 1}. {q.question}
          </p>
          <div className="flex flex-col gap-2">
            {q.options.map((option, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <input
                  type="radio"
                  name={q.id}
                  checked={answers[q.id] === idx}
                  onChange={() => selectAnswer(q.id, idx)}
                  className="accent-[var(--color-green)]"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5">
        <p className="text-sm font-medium mb-3">Brainstorm: {category.brainstormPrompt}</p>
        <textarea
          value={brainstormAnswer}
          onChange={(e) => setBrainstormAnswer(e.target.value)}
          placeholder="Jot down your thoughts (optional — not scored, just for reflection)"
          rows={3}
          className="w-full bg-[var(--color-black)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-[var(--color-yellow)]"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!allAnswered}
        className="bg-[var(--color-green)] text-[var(--color-black)] font-semibold rounded-lg py-2.5 text-sm hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {allAnswered ? 'Submit quiz' : `Answer all ${category.mcqs.length} questions to submit`}
      </button>
    </div>
  );
}
