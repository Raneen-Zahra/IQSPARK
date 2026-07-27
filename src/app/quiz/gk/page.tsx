import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuizRunner from '@/components/QuizRunner';
import { getCategory } from '@/lib/questions';

export default function GKQuizPage() {
  const category = getCategory('gk')!;

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-2xl w-full mx-auto px-6 py-10">
        <div
          className="h-1 w-10 rounded-full mb-4"
          style={{
            background:
              category.accent === 'mixed'
                ? 'linear-gradient(90deg, var(--color-green), var(--color-yellow), var(--color-red))'
                : category.accent,
          }}
        />
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-6">
          {category.name}
        </h1>
        <QuizRunner category={category} />
      </main>
      <Footer />
    </>
  );
}
