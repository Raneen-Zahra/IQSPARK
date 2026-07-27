import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function GKQuizPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-2xl w-full mx-auto px-6 py-16 text-center">
        <div
          className="h-1 w-10 rounded-full mb-5 mx-auto"
          style={{
            background:
              'linear-gradient(90deg, var(--color-green), var(--color-yellow), var(--color-red))',
          }}
        />
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-2">
          General Knowledge
        </h1>
        <p className="text-sm text-[var(--color-muted)]">
          Quiz content coming soon — this is a placeholder screen for the scaffold.
        </p>
      </main>
      <Footer />
    </>
  );
}
