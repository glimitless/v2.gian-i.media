'use client';

type PDFDirectionControlProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageCount: number;
};

// 32px square from 1024 (44px below, per the PageCollectionVisualResearch frames), 1px fadedText edge. Disabled uses medium and fadedText.
export const PDF_BUTTON =
  'grid size-8 shrink-0 place-items-center border border-lmFadedText text-lmPrimary transition-colors duration-(--duration-hover) ease-snap hover:bg-lmPrimary hover:text-lmBg max-lg:size-11 disabled:cursor-not-allowed disabled:border-lmMedium disabled:text-lmFadedText disabled:hover:bg-transparent disabled:hover:text-lmFadedText dark:border-dmFadedText dark:text-dmPrimary dark:hover:bg-dmPrimary dark:hover:text-dmBg dark:disabled:border-dmMedium dark:disabled:text-dmFadedText dark:disabled:hover:bg-transparent dark:disabled:hover:text-dmFadedText';

export default function PDFDirectionControls({ currentPage, setCurrentPage, pageCount }: PDFDirectionControlProps) {
  return (
    <div className="flex flex-row items-center gap-1.5 sm:gap-2">
      <button type="button" className={PDF_BUTTON} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage <= 0} aria-label="Previous page">
        <span aria-hidden="true">‹</span>
      </button>
      <button type="button" className={PDF_BUTTON} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage >= pageCount - 1} aria-label="Next page">
        <span aria-hidden="true">›</span>
      </button>
    </div>
  );
}
