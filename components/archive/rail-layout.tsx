import type { ReactNode } from 'react';

/**
 * Two-column shell (note, note section, resume): content in columns 1–10 and the archive
 * nav rail in column 12 from 1280; below that the nav becomes a strip at the end of the page.
 */
export default function RailLayout({ nav, children }: { nav: ReactNode; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-12 pt-12 pb-16 xl:grid-cols-12 xl:gap-x-6">
      <div className="min-w-0 xl:col-span-10">{children}</div>
      <aside className="xl:col-span-1 xl:col-start-12">{nav}</aside>
    </div>
  );
}
