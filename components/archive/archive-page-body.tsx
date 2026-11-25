'use client';

import { useFilterContext } from '@/lib/filter/filter-provider';
import ArchiveFilter from './archive-filter';
import ArchiveResults from './archive-results';
import { DISPLAY_HEADING, LABEL_ACCENT, LABEL_FADED } from '@/lib/ui/classes';

export default function ArchivePageBody() {
  const { filteredArchiveIDs } = useFilterContext();
  const count = filteredArchiveIDs.length;

  return (
    <div className="flex flex-col gap-8 pt-12 pb-16">
      <div className="flex flex-col gap-3">
        <span className={LABEL_ACCENT}>FIG. 00 — INDEX</span>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h1 className={DISPLAY_HEADING}>Archive</h1>
          <span aria-live="polite" className={LABEL_FADED}>
            {count} {count === 1 ? 'RESULT' : 'RESULTS'}
          </span>
        </div>
      </div>
      <ArchiveFilter />
      <ArchiveResults />
    </div>
  );
}
