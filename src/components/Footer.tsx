const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/arhazeen/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/raneen-zahra-940269274' },
  { label: 'GitHub', href: 'https://github.com/Raneen-Zahra' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100092425415242' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-5 flex-wrap">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-yellow)] transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="text-xs text-[var(--color-muted)] font-[family-name:var(--font-mono)] text-left sm:text-right">
          <p>@Arhazel &mdash; &copy; 2026 ITECF23BSR02</p>
          <p>Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}
