'use client';

import type { MediaPartArgs } from '@/types/content-body';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PDFDirectionControls from './pdf/pdf-direction-controls';
import PDFExpandModal from './pdf/pdf-expand-modal';
import PDFPageMedia from './pdf/pdf-page-media';
import PDFPageInput from './pdf/pdf-page-input';
import clampPDFPage from './pdf/clamp-pdf-page';

const PRERENDER_RADIUS = 2;
// Fill the stage box and letterbox the page inside it, so next/image never renders at its intrinsic size.
const PAGE_FIT = 'h-full w-full object-contain';

function pageRenderRange(current: number, count: number) {
  const start = Math.max(0, current - PRERENDER_RADIUS);
  const end = Math.min(count - 1, current + PRERENDER_RADIUS);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

/** Pages stay mounted in a window around the current page so flipping is instant. */
function PageStack({ pages, currentPage, className }: { pages: MediaPartArgs[]; currentPage: number; className?: string }) {
  return (
    <>
      {pageRenderRange(currentPage, pages.length).map((index) => {
        const isActive = index === currentPage;
        return (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center ${isActive ? '' : 'invisible pointer-events-none'}`}
            aria-hidden={!isActive}
            inert={!isActive}
          >
            <PDFPageMedia page={pages[index]} isActive={isActive} className={className} />
          </div>
        );
      })}
    </>
  );
}

export default function PDFViewer({ pages }: { pages: MediaPartArgs[] }) {
  const isSinglePage = pages.length === 1;
  const pageCount = pages.length;

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pageInputRef = useRef<HTMLInputElement>(null);

  const goToPage = (next: number) => setCurrentPage(clampPDFPage(next, pageCount));

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' || event.key === 'Enter') {
        event.preventDefault();
        setIsOpen(false);
        return;
      }
      if (isSinglePage || event.ctrlKey || event.target instanceof HTMLInputElement) return;
      if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
        event.preventDefault();
        setCurrentPage((prev) => clampPDFPage(prev + 1, pageCount));
      } else if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
        event.preventDefault();
        setCurrentPage((prev) => clampPDFPage(prev - 1, pageCount));
      }
    }

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, isSinglePage, pageCount]);

  const progress = pageCount > 1 ? (currentPage / (pageCount - 1)) * 100 : 100;

  const fullscreen =
    isOpen &&
    createPortal(
      <div role="dialog" aria-modal="true" aria-label="PDF viewer" className="fixed inset-0 z-50 flex flex-col bg-lmBg dark:bg-dmBg">
        <div className="flex flex-1 min-h-0 items-center gap-4 px-4 py-4 sm:px-(--margin-desktop)">
          {!isSinglePage && (
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage <= 0}
              aria-label="Previous page"
              className="grid h-full w-11 shrink-0 place-items-center text-lmPrimary disabled:text-lmFadedText dark:text-dmPrimary dark:disabled:text-dmFadedText"
            >
              <span aria-hidden="true" className="text-displayMobile">‹</span>
            </button>
          )}
          <div className="relative flex-1 min-h-0 h-full border border-lmMedium bg-lmSurface dark:border-dmMedium dark:bg-dmSurface">
            <PageStack pages={pages} currentPage={currentPage} className={PAGE_FIT} />
          </div>
          {!isSinglePage && (
            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage >= pageCount - 1}
              aria-label="Next page"
              className="grid h-full w-11 shrink-0 place-items-center text-lmPrimary disabled:text-lmFadedText dark:text-dmPrimary dark:disabled:text-dmFadedText"
            >
              <span aria-hidden="true" className="text-displayMobile">›</span>
            </button>
          )}
        </div>
        <div className="flex h-18 items-center justify-between border-t border-lmPrimary px-4 dark:border-dmPrimary sm:px-(--margin-desktop)">
          <span className="a-label text-lmSecondary dark:text-dmSecondary">
            {String(currentPage + 1).padStart(3, '0')} / {String(pageCount).padStart(3, '0')}
          </span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="a-label h-11 px-4 border border-lmPrimary text-lmPrimary hover:bg-lmPrimary hover:text-lmBg dark:border-dmPrimary dark:text-dmPrimary dark:hover:bg-dmPrimary dark:hover:text-dmBg"
          >
            Close ✕
          </button>
        </div>
      </div>,
      document.body,
    );

  return (
    <div className="block w-full border border-lmMedium dark:border-dmMedium">
      {/* Fixed 16:9 surface stage; pages are contained. Clicking it opens full screen (⤢ is the keyboard control). */}
      <div className="relative aspect-video w-full bg-lmSurface dark:bg-dmSurface">
        <button type="button" tabIndex={-1} aria-hidden="true" className="absolute inset-0 cursor-zoom-in" onClick={() => setIsOpen(true)} />
        <div className="pointer-events-none absolute inset-0">
          <PageStack pages={pages} currentPage={currentPage} className={PAGE_FIT} />
        </div>
      </div>
      {/* Bar: mono counter · 2px medium track with accent fill · ‹ › ⤢. Single page keeps only the label and ⤢. */}
      <div className="flex items-center gap-2 border-t border-lmMedium px-2.5 py-2 sm:gap-4 dark:border-dmMedium">
        {!isSinglePage ? (
          <>
            <PDFPageInput currentPage={currentPage} setCurrentPage={goToPage} pageCount={pageCount} pageInputRef={pageInputRef} />
            <div className="relative h-0.5 min-w-0 flex-1 bg-lmMedium dark:bg-dmMedium" aria-hidden="true">
              <div className="absolute inset-y-0 left-0 bg-lmAccent dark:bg-dmAccent" style={{ width: `${progress}%` }} />
            </div>
            <PDFDirectionControls currentPage={currentPage} setCurrentPage={goToPage} pageCount={pageCount} />
          </>
        ) : (
          <span className="a-label flex-1 text-lmFadedText dark:text-dmFadedText">PDF · 1 page</span>
        )}
        <PDFExpandModal setIsOpen={setIsOpen} variant="maximize" />
      </div>
      {fullscreen}
    </div>
  );
}
