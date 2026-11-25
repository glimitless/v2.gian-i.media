import type { ReactNode } from 'react';
import { LABEL_ACCENT } from '@/lib/ui/classes';

/**
 * A § section: a primary rule, then a "§ nn — TITLE" label in a two-column gutter (from 1024)
 * beside an 8-column body. Below 1024 the label sits above the body.
 */
export default function SpecSection({ index, title, id, children }: { index: number; title: string; id?: string; children: ReactNode }) {
  const labelId = id ? `${id}-label` : undefined;
  return (
    <section aria-labelledby={labelId} className="grid gap-4 border-t border-lmPrimary pt-6 pb-10 lg:grid-cols-10 lg:gap-x-6 dark:border-dmPrimary">
      <h2 id={labelId} className={`${LABEL_ACCENT} lg:col-span-2`}>
        § {String(index).padStart(2, '0')} — {title}
      </h2>
      <div className="min-w-0 lg:col-span-8">{children}</div>
    </section>
  );
}
