"use client";

import Link from "next/link";
import { useState } from "react";

const tools = [
  { href: "/rifas", label: "Sorteador" },
  { href: "/musica", label: "Música" },
  { href: "/memorama", label: "Memorama" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-indigo-600 tracking-tight">
          Jonax<span className="text-gray-800">.dev</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
            >
              {t.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded text-gray-500 hover:text-indigo-600"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-3">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
              onClick={() => setOpen(false)}
            >
              {t.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
