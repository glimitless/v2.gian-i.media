'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import ThemeToggle from '@/components/theme/theme-toggle';
import { CONTACT_LINKS } from './site-footer';

// Top nav is Archive · Resume only. Archive is active on every /archive page.
const NAV = [
  { label: 'Archive', href: '/archive', isActive: (p: string) => p === '/archive' || p.startsWith('/archive/') },
  { label: 'Resume', href: '/resume', isActive: (p: string) => p === '/resume' },
];

function navLinkClass(active: boolean) {
  const base =
    'a-label relative pb-1 after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:origin-left after:transition-transform after:duration-(--duration-settle) after:ease-out';
  return active
    ? `${base} text-lmPrimary after:scale-x-100 after:bg-lmAccent dark:text-dmPrimary dark:after:bg-dmAccent`
    : `${base} text-lmSecondary after:scale-x-0 after:bg-lmAccent hover:text-lmPrimary dark:text-dmSecondary dark:after:bg-dmAccent dark:hover:text-dmPrimary`;
}

export default function SiteHeader() {
  const pathname = usePathname() ?? '';
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-50">
      <div className="flex h-18 items-center justify-between border-b border-lmPrimary dark:border-dmPrimary">
        <Link
          href="/"
          className="font-text text-[1.125rem] leading-6 font-bold font-stretch-110% tracking-[-0.01em] text-lmPrimary dark:text-dmPrimary"
        >
          Gian-I Cambridge
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 sm:flex">
          {NAV.map((item) => {
            const active = item.isActive(pathname);
            return (
              <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined} className={navLinkClass(active)}>
                {item.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-4 sm:hidden">
          {!menuOpen && <ThemeToggle />}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="a-label h-18 px-1 text-lmPrimary dark:text-dmPrimary"
          >
            {menuOpen ? 'Close ✕' : 'Menu ☰'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-18 bottom-0 flex flex-col overflow-y-auto bg-lmBg px-(--margin-mobile) pb-8 dark:bg-dmBg sm:hidden"
        >
          <nav aria-label="Main" className="mt-6 border-t border-lmPrimary dark:border-dmPrimary">
            <ul>
              {[{ label: 'Home', href: '/', isActive: (p: string) => p === '/' }, ...NAV].map((item, i) => {
                const active = item.isActive(pathname);
                return (
                  <li key={item.href} className="border-b border-lmMedium dark:border-dmMedium">
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-baseline gap-4 py-4 font-text text-displayMobile font-stretch-108% text-lmPrimary dark:text-dmPrimary"
                    >
                      <span className="a-label text-lmAccentInk dark:text-dmAccentInk">0{i + 1}</span>
                      <span className={active ? 'underline decoration-2 decoration-lmAccent underline-offset-8 dark:decoration-dmAccent' : ''}>
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <ul className="mt-6 flex flex-col gap-3">
            {CONTACT_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-subtitle text-lmPrimary underline decoration-lmFadedText underline-offset-4 dark:text-dmPrimary dark:decoration-dmFadedText"
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>

          <MobileThemeSwitch />

          <p className="a-label mt-auto pt-10 text-lmFadedText dark:text-dmFadedText">Gian-I Cambridge — Toronto, ON</p>
        </div>
      )}
    </header>
  );
}

function MobileThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const options = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ];
  return (
    <div className="mt-8">
      <p className="a-label mb-2 text-lmFadedText dark:text-dmFadedText">Theme</p>
      <div className="inline-flex border border-lmPrimary dark:border-dmPrimary">
        {options.map((option) => {
          const selected = theme === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => setTheme(option.value)}
              className={`a-label h-11 px-5 ${selected ? 'bg-lmPrimary text-lmBg dark:bg-dmPrimary dark:text-dmBg' : 'text-lmPrimary hover:bg-lmBgActive dark:text-dmPrimary dark:hover:bg-dmBgActive'}`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
