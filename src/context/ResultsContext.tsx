'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export type QuizResult = {
  subject: string;
  categorySlug: string;
  date: string; // ISO date
  score: number; // percentage, 0-100
};

type ResultsContextValue = {
  results: QuizResult[];
  addResult: (result: QuizResult) => void;
  clearHistory: () => void;
};

const ResultsContext = createContext<ResultsContextValue | null>(null);

function storageKey(email: string) {
  return `iqspark_results_${email}`;
}

export function ResultsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [results, setResults] = useState<QuizResult[]>([]);

  const loadResults = useCallback(() => {
    if (!user) {
      setResults([]);
      return;
    }
    try {
      const stored = localStorage.getItem(storageKey(user.email));
      setResults(stored ? JSON.parse(stored) : []);
    } catch {
      setResults([]);
    }
  }, [user]);

  // results live in localStorage, which isn't available during server rendering,
  // so the read has to happen post-mount in an effect (same reasoning as AuthContext).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see comment above
    loadResults();
  }, [loadResults]);

  function persist(updated: QuizResult[]) {
    setResults(updated);
    if (user) localStorage.setItem(storageKey(user.email), JSON.stringify(updated));
  }

  function addResult(result: QuizResult) {
    persist([result, ...results]);
  }

  function clearHistory() {
    persist([]);
  }

  return (
    <ResultsContext.Provider value={{ results, addResult, clearHistory }}>
      {children}
    </ResultsContext.Provider>
  );
}

export function useResults() {
  const ctx = useContext(ResultsContext);
  if (!ctx) throw new Error('useResults must be used within a ResultsProvider');
  return ctx;
}
