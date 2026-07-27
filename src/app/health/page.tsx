import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Always render fresh — this page exists specifically to verify the deployment
// can reach the network and fetch real data, not serve a cached/static result.
export const dynamic = 'force-dynamic';

type TriviaResponse = {
  response_code: number;
  results: {
    category: string;
    question: string;
    difficulty: string;
  }[];
};

// The Open Trivia DB API HTML-encodes special characters in its text fields.
// Decode the handful of entities it actually uses rather than reaching for
// dangerouslySetInnerHTML, which would be an unnecessary XSS surface for
// content coming from a third-party API.
function decodeEntities(text: string) {
  const entities: Record<string, string> = {
    '&quot;': '"',
    '&#039;': "'",
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&rsquo;': '’',
    '&eacute;': 'é',
  };
  return text.replace(/&[a-z#0-9]+;/gi, (match) => entities[match] ?? match);
}

async function getSampleQuestion() {
  try {
    const res = await fetch('https://opentdb.com/api.php?amount=1&type=multiple', {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const data: TriviaResponse = await res.json();
    const raw = data.results[0];
    return {
      ok: true as const,
      question: { ...raw, question: decodeEntities(raw.question) },
    };
  } catch (err) {
    return { ok: false as const, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

export default async function HealthCheckPage() {
  const result = await getSampleQuestion();

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-2xl w-full mx-auto px-6 py-16">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-1">
          Health Check
        </h1>
        <p className="text-sm text-[var(--color-muted)] mb-8 font-[family-name:var(--font-mono)]">
          Verifies the deployment can reach an external API and render live data.
        </p>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6">
          {result.ok ? (
            <>
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: 'var(--color-green)' }}
                />
                <span className="text-sm font-semibold" style={{ color: 'var(--color-green)' }}>
                  API reachable
                </span>
              </div>
              <p className="text-xs text-[var(--color-muted)] mb-1">Sample question fetched:</p>
              <p className="text-sm mb-3">{result.question.question}</p>
              <p className="text-xs text-[var(--color-muted)] font-[family-name:var(--font-mono)]">
                Category: {result.question.category} &middot; Difficulty: {result.question.difficulty}
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: 'var(--color-red)' }}
                />
                <span className="text-sm font-semibold" style={{ color: 'var(--color-red)' }}>
                  API unreachable
                </span>
              </div>
              <p className="text-xs text-[var(--color-muted)]">{result.error}</p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
