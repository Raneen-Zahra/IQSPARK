import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NonVerbalQuizPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-2xl w-full mx-auto px-6 py-16 text-center">
        <div className="h-1 w-10 rounded-full mb-5 mx-auto" style={{ background: 'var(--color-yellow)' }} />
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-2">
          Non-Verbal Reasoning
        </h1>
        <p className="text-sm text-[var(--color-muted)]">
          Quiz content coming soon — this is a placeholder screen for the scaffold.
        </p>
      </main>
      <Footer />
    </>
  );
}
