'use client';

import { useId, useState, type ReactNode } from 'react';

type DisclosureProps = {
  title: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  headingLevel?: 2 | 3 | 4;
} & (
  | { variant?: 'row' }
  /** Resume entry: date · title · location · ± (172 · 1fr · 220 · 22 from 640). */
  | { variant: 'entry'; lead: ReactNode }
);

const SQUARE_BASE =
  'grid size-[22px] shrink-0 place-items-center border text-[12px] leading-none transition-colors duration-(--duration-hover) ease-snap max-sm:size-11';
const SQUARE_OPEN = 'border-lmPrimary bg-lmPrimary text-lmBg dark:border-dmPrimary dark:bg-dmPrimary dark:text-dmBg';
const SQUARE_CLOSED = 'border-lmPrimary text-lmPrimary dark:border-dmPrimary dark:text-dmPrimary';
const TITLE =
  'font-text text-[1.0625rem] leading-[1.375rem] font-semibold font-stretch-105% text-lmPrimary group-hover:text-lmAccentInk sm:text-[1.1875rem] sm:leading-6 dark:text-dmPrimary dark:group-hover:text-dmAccentInk';
const META = 'a-label text-lmFadedText dark:text-dmFadedText';

/**
 * Ruled disclosure row. Open: the square fills primary and the row sits on bgActive.
 * "row" (notes): ⌄/⌃ square · title · date. "entry" (resume): date · title · location · ±.
 */
export default function Disclosure(props: DisclosureProps) {
  const { title, meta, children, headingLevel = 3 } = props;
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4';
  const square = `${SQUARE_BASE} ${open ? SQUARE_OPEN : SQUARE_CLOSED}`;
  const isEntry = props.variant === 'entry';

  return (
    // -mx-3/px-3: the row content stays flush with the column, and the open background bleeds 12px (as in the frames).
    // The hairline stays inside the column while closed and spans the bleed when open.
    <div
      className={`relative -mx-3 transition-colors duration-(--duration-hover) ease-snap after:absolute after:bottom-0 after:h-px after:bg-lmMedium dark:after:bg-dmMedium ${
        open ? 'bg-lmBgActive after:inset-x-0 dark:bg-dmBgActive' : 'after:inset-x-3'
      }`}
    >
      <Heading className="m-0">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className={
            isEntry
              ? 'group grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-1 px-3 py-4 text-left sm:grid-cols-[172px_minmax(0,1fr)_220px_22px]'
              : 'group flex w-full items-center gap-4 px-3 py-4 text-left'
          }
        >
          {isEntry ? (
            <>
              <span className={`${META} max-sm:col-start-1 max-sm:row-start-1`}>{props.lead}</span>
              <span className={`${TITLE} max-sm:col-start-1 max-sm:row-start-2`}>{title}</span>
              {meta && <span className={`${META} max-sm:col-start-1 max-sm:row-start-3`}>{meta}</span>}
              <span aria-hidden="true" className={`${square} max-sm:col-start-2 max-sm:row-span-3 max-sm:row-start-1 max-sm:self-start pb-[0.1rem]`}>
                {open ? '−' : '+'}
              </span>
            </>
          ) : (
            <>
              <span aria-hidden="true" className={square}>
                <span className={`inline-block text-[14px] transition-transform duration-(--duration-settle) ease-out ${open ? '-rotate-90' : 'rotate-90'}`}>›</span>
              </span>
              <span className={`min-w-0 flex-1 ${TITLE}`}>{title}</span>
              {meta && <span className={`${META} shrink-0`}>{meta}</span>}
            </>
          )}
        </button>
      </Heading>
      <div id={panelId} className={`grid transition-[grid-template-rows] duration-(--duration-settle) ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="min-h-0 overflow-hidden">
          <div className={isEntry ? 'px-3 pb-5 sm:pl-52' : 'pr-3 pb-5 pl-12.5'}>{children}</div>
        </div>
      </div>
    </div>
  );
}
