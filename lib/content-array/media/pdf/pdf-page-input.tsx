'use client';

import type { RefObject } from 'react';
import { useState } from 'react';
import clampPDFPage from './clamp-pdf-page';

type PDFCurrentPageProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageCount: number;
  pageInputRef?: RefObject<HTMLInputElement | null>;
};

const pad = (n: number) => String(n).padStart(3, '0');

/** The mono counter "PDF · 001 / 088". The current page is an editable field (type a page, ←/→ or A/D to flip). */
export default function PDFPageInput({ currentPage, setCurrentPage, pageCount, pageInputRef }: PDFCurrentPageProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const display = draft ?? pad(currentPage + 1);

  function commitDraft(input: string) {
    if (input !== '') setCurrentPage(clampPDFPage(Number(input) - 1, pageCount));
    setDraft(null);
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (value === '' || (/^\d+$/.test(value) && Number(value) <= pageCount)) {
      setDraft(value);
      if (value !== '' && Number(value) > 0) setCurrentPage(clampPDFPage(Number(value) - 1, pageCount));
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.ctrlKey) return;
    if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
      event.preventDefault();
      setDraft(null);
      setCurrentPage(currentPage + 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
      event.preventDefault();
      setDraft(null);
      setCurrentPage(currentPage - 1);
    } else if (event.key === 'Escape' || event.key === 'Enter') {
      event.preventDefault();
      event.currentTarget.blur();
    }
  }

  return (
    <label className="a-label flex shrink-0 items-center gap-1 text-lmFadedText dark:text-dmFadedText">
      <span>PDF ·</span>
      <input
        ref={pageInputRef}
        className="w-[3.5ch] bg-transparent p-0 text-center font-mono font-semibold text-lmPrimary underline-offset-4 hover:underline focus-visible:outline-2 dark:text-dmPrimary"
        value={display}
        onChange={onChange}
        onFocus={(event) => event.currentTarget.select()}
        onBlur={() => commitDraft(draft ?? '')}
        onKeyDown={onKeyDown}
        inputMode="numeric"
        aria-label="Current PDF page"
      />
      <span>/ {pad(pageCount)}</span>
    </label>
  );
}
