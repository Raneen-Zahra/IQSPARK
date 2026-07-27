'use client';

import { useState } from 'react';
import Link from 'next/link';

const LINKS = [
  { label: 'Dashboard', href: '/home' },
  { label: 'Profile', href: '/profile' },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="p-2 text-[var(--color-text)]"
      >
        <span className="block w-6 h-0.5 bg-current mb-1.5" />
        <span className="block w-6 h-0.5 bg-current mb-1.5" />
        <span className="block w-6 h-0.5 bg-current" />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full bg-[var(--color-surface)] border-b border-[var(--color-border)] px-6 py-4 flex flex-col gap-3">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm text-[var(--color-text)] hover:text-[var(--color-yellow)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
