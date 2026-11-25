'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

// ◐ is a text glyph (no icon library). Shows the mode the button switches to.
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  // false on the server and during hydration, true afterwards: avoids a theme mismatch.
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const isDark = mounted && resolvedTheme === 'dark';
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`grid size-7 place-items-center border border-lmPrimary text-[13px] leading-none text-lmPrimary hover:bg-lmBgActive dark:border-dmPrimary dark:text-dmPrimary dark:hover:bg-dmBgActive transition-colors duration-(--duration-hover) ease-snap ${className}`}
    >
      <span aria-hidden="true">◐</span>
    </button>
  );
}
