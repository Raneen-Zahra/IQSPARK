export type MCQ = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
};

export type Category = {
  slug: string;
  name: string;
  accent: string; // CSS color value, or 'mixed' for a gradient
  mcqs: MCQ[];
  brainstormPrompt: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: 'verbal',
    name: 'Verbal Reasoning',
    accent: 'var(--color-green)',
    mcqs: [
      {
        id: 'v1',
        question: 'Book is to Reading as Fork is to:',
        options: ['Kitchen', 'Eating', 'Metal', 'Spoon'],
        correctIndex: 1,
      },
      {
        id: 'v2',
        question: 'Choose the word that is the opposite of "Abundant":',
        options: ['Plentiful', 'Scarce', 'Generous', 'Massive'],
        correctIndex: 1,
      },
      {
        id: 'v3',
        question: 'Which word does not belong with the others?',
        options: ['Whisper', 'Shout', 'Murmur', 'Chair'],
        correctIndex: 3,
      },
      {
        id: 'v4',
        question: '"He was as brave as a lion" is an example of a:',
        options: ['Metaphor', 'Simile', 'Hyperbole', 'Pun'],
        correctIndex: 1,
      },
    ],
    brainstormPrompt:
      'Describe a time you had to explain a complex idea to someone with no background in it. What approach did you take?',
  },
  {
    slug: 'non-verbal',
    name: 'Non-Verbal Reasoning',
    accent: 'var(--color-yellow)',
    mcqs: [
      {
        id: 'nv1',
        question: 'A sequence goes 2, 4, 8, 16, ... What comes next?',
        options: ['20', '24', '32', '30'],
        correctIndex: 2,
      },
      {
        id: 'nv2',
        question: 'If a square is rotated 45°, it visually resembles a:',
        options: ['Circle', 'Diamond', 'Triangle', 'Pentagon'],
        correctIndex: 1,
      },
      {
        id: 'nv3',
        question: 'Which shape completes the pattern: Circle, Square, Circle, Square, ___?',
        options: ['Triangle', 'Circle', 'Square', 'Hexagon'],
        correctIndex: 1,
      },
      {
        id: 'nv4',
        question: 'A cube has how many faces?',
        options: ['4', '6', '8', '12'],
        correctIndex: 1,
      },
    ],
    brainstormPrompt:
      'If you were designing a visual puzzle to test spatial reasoning, what shapes or patterns would you use, and why?',
  },
  {
    slug: 'current-affairs',
    name: 'Current Affairs',
    accent: 'var(--color-red)',
    mcqs: [
      {
        id: 'ca1',
        question: 'Which organization publishes the annual World Development Report?',
        options: ['United Nations', 'World Bank', 'WHO', 'IMF'],
        correctIndex: 1,
      },
      {
        id: 'ca2',
        question: 'A "carbon-neutral" target generally refers to:',
        options: [
          'Eliminating all carbon-based fuel',
          'Balancing emissions with removal/offsets',
          'Banning cars entirely',
          'Reducing plastic use',
        ],
        correctIndex: 1,
      },
      {
        id: 'ca3',
        question: 'GDP stands for:',
        options: [
          'Global Debt Percentage',
          'Gross Domestic Product',
          'General Development Plan',
          'Government Deficit Projection',
        ],
        correctIndex: 1,
      },
    ],
    brainstormPrompt:
      'Pick one news story from this month and explain, in your own words, why it matters beyond the immediate headline.',
  },
  {
    slug: 'gk',
    name: 'General Knowledge',
    accent: 'mixed',
    mcqs: [
      {
        id: 'gk1',
        question: 'What is the largest planet in our solar system?',
        options: ['Earth', 'Saturn', 'Jupiter', 'Neptune'],
        correctIndex: 2,
      },
      {
        id: 'gk2',
        question: 'Who wrote the play "Romeo and Juliet"?',
        options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
        correctIndex: 1,
      },
      {
        id: 'gk3',
        question: 'What is the chemical symbol for gold?',
        options: ['Ag', 'Au', 'Gd', 'Go'],
        correctIndex: 1,
      },
      {
        id: 'gk4',
        question: 'Which is the longest river in the world?',
        options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
        correctIndex: 1,
      },
    ],
    brainstormPrompt:
      'If you could instantly become an expert in one field outside your current work, which would you choose and what would you do with that knowledge?',
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function totalQuestionCount(): number {
  return CATEGORIES.reduce((sum, c) => sum + c.mcqs.length, 0);
}
