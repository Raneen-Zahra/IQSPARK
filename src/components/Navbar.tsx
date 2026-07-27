import Link from 'next/link';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import LogoutButton from './LogoutButton';

export default function Navbar() {
  return (
    <nav className="relative border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/home" className="flex items-center gap-2">
          <Logo size={26} />
          <span className="font-[family-name:var(--font-display)] font-semibold tracking-tight">
            IQ Spark
          </span>
        </Link>

        <div className="hidden sm:flex items-center gap-6">
          <Link href="/home" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-yellow)] transition-colors">
            Dashboard
          </Link>
          <Link href="/profile" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-yellow)] transition-colors">
            Profile
          </Link>
          <LogoutButton />
        </div>

        <MobileMenu />
      </div>
    </nav>
  );
}
