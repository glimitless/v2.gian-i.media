'use client';

import { useId, useState, type ReactNode } from 'react';
import { useFilterContext, CONTENT_TYPE_OPTIONS, SORT_ORDER_OPTIONS, TAG_TYPE_OPTIONS } from '@/lib/filter/filter-provider';
import type { ContentTypeArgs, TagArgs, TagTypeArgs } from '@/types/filter';
import FilterChip from './filter-chip';
import { BUTTON_PRIMARY, CONTROL, CONTROL_PRESSED, LABEL_FADED } from '@/lib/ui/classes';

type Option = 'type' | 'sort' | 'tag-type' | 'tag';

const CONTENT_TYPE_LABEL: Record<ContentTypeArgs, string> = { all: 'All', works: 'Works', notes: 'Notes' };
const TAG_TYPE_LABEL: Record<TagTypeArgs, string> = { all: 'All', none: 'None', keywords: 'Keywords', tools: 'Tools' };

// Literal class pairs so Tailwind sees them: desktop shows only the open option, mobile shows every section while open.
const DESKTOP_OPEN = 'sm:flex';
const DESKTOP_CLOSED = 'sm:hidden';

/** Joined segmented button (Type, Sort, Tag type). Selected = filled primary plus a check. */
function Choice({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`${CONTROL} ${CONTROL_PRESSED} flex min-h-11 items-center justify-between gap-2 px-3 text-left sm:min-h-9`}
    >
      <span>{children}</span>
      {selected && <span aria-hidden="true">✓</span>}
    </button>
  );
}

function Section({ legend, className, children }: { legend: string; className: string; children: ReactNode }) {
  return (
    <fieldset className={`flex-col gap-3 ${className}`}>
      <legend className={`${LABEL_FADED} mb-3`}>{legend}</legend>
      {children}
    </fieldset>
  );
}

function OptionButton({ label, value, expanded, onClick }: { label: string; value?: string; expanded: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-expanded={expanded}
      onClick={onClick}
      className={`a-label flex min-h-8 items-center gap-2 border px-3 transition-colors duration-(--duration-hover) ease-snap ${
        expanded
          ? 'border-lmPrimary bg-lmBgActive text-lmPrimary dark:border-dmPrimary dark:bg-dmBgActive dark:text-dmPrimary'
          : 'border-lmFadedText text-lmSecondary hover:bg-lmBgActive hover:text-lmPrimary dark:border-dmFadedText dark:text-dmSecondary dark:hover:bg-dmBgActive dark:hover:text-dmPrimary'
      }`}
    >
      <span className="text-lmPrimary dark:text-dmPrimary">{value === undefined ? label : `${label}: ${value}`}</span>
      <span aria-hidden="true">{expanded ? '▴' : '▾'}</span>
    </button>
  );
}

export default function ArchiveFilter() {
  const {
    filterArguments,
    filteredArchiveIDs,
    inactiveTags,
    isDefault,
    resetFilter,
    onToggleTag,
    onToggleTagType,
    onToggleTitleSearch,
    onToggleContentType,
    onToggleSortOrder,
  } = useFilterContext();
  const [openOption, setOpenOption] = useState<Option | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelId = useId();

  const { contentType, sortOrder, tagType, searchQuery, tags } = filterArguments;
  const resultCount = filteredArchiveIDs.length;
  const activeCount =
    Number(contentType !== 'all') + Number(searchQuery !== '') + Number(sortOrder !== 'Chronological') + Number(tagType !== 'keywords') + Number(tags.length > 0);

  // Tags section: selected first, then the rest A–Z from the current results.
  const allTags: TagArgs[] = [...tags, ...inactiveTags];

  const toggleOption = (option: Option) => setOpenOption((current) => (current === option ? null : option));
  const sectionClass = (option: Option) => `${mobileOpen ? 'flex' : 'hidden'} ${openOption === option ? DESKTOP_OPEN : DESKTOP_CLOSED}`;

  const resetButton = (className: string) =>
    !isDefault && (
      <button type="button" onClick={resetFilter} className={`${CONTROL} items-center px-4 ${className}`}>
        Reset
      </button>
    );

  return (
    <section aria-label="Filter" className="flex flex-col gap-4 border-t border-lmPrimary pt-4 dark:border-dmPrimary">
      {/* Mobile trigger: full-width Filter bar with the active count, Reset beside it. */}
      <div className="flex gap-2 sm:hidden">
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls={panelId}
          onClick={() => setMobileOpen((open) => !open)}
          className={`a-label flex min-h-12 flex-1 items-center justify-between border px-4 transition-colors duration-(--duration-hover) ease-snap ${
            mobileOpen
              ? 'border-lmPrimary bg-lmPrimary text-lmBg dark:border-dmPrimary dark:bg-dmPrimary dark:text-dmBg'
              : 'border-lmPrimary text-lmPrimary hover:bg-lmBgActive dark:border-dmPrimary dark:text-dmPrimary dark:hover:bg-dmBgActive'
          }`}
        >
          <span className="flex items-center gap-3">
            Filter
            {activeCount > 0 && (
              <span className="grid size-5 place-items-center bg-lmAccent text-[12px] text-lmOnAccent dark:bg-dmAccent dark:text-dmOnAccent" aria-label={`${activeCount} active`}>
                {activeCount}
              </span>
            )}
          </span>
          <span aria-hidden="true">{mobileOpen ? '▴' : '▾'}</span>
        </button>
        {resetButton('flex min-h-12')}
      </div>

      {/* Non-default arguments as removable chips while the mobile filter is closed. Selected tags show only inside the open filter. */}
      {!mobileOpen && !isDefault && (
        <div className="flex flex-wrap gap-2 sm:hidden">
          {searchQuery !== '' && <FilterChip label={`“${searchQuery}”`} onRemove={() => onToggleTitleSearch('')} />}
          {contentType !== 'all' && <FilterChip label={CONTENT_TYPE_LABEL[contentType]} onRemove={() => onToggleContentType('all')} />}
          {sortOrder !== 'Chronological' && <FilterChip label={sortOrder} onRemove={() => onToggleSortOrder('Chronological')} />}
          {tagType !== 'keywords' && <FilterChip label={`Tags: ${TAG_TYPE_LABEL[tagType]}`} onRemove={() => onToggleTagType('keywords')} />}
        </div>
      )}

      <div id={panelId} className={`flex-col gap-6 ${mobileOpen ? 'flex' : 'hidden'} sm:flex`}>
        {/* Row 1: title search, Reset, selected tags (desktop). */}
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => onToggleTitleSearch(event.target.value)}
            placeholder="SEARCH TITLES"
            aria-label="Search titles"
            className="min-h-11 w-full min-w-0 border border-lmFadedText bg-transparent px-3 font-mono text-[0.75rem] tracking-[0.06em] text-lmPrimary placeholder:text-lmFadedText sm:min-h-9 sm:w-90 dark:border-dmFadedText dark:text-dmPrimary dark:placeholder:text-dmFadedText"
          />
          {resetButton('hidden min-h-9 sm:flex')}
          <div className="hidden flex-wrap gap-2 sm:flex">
            {tags.map((tag) => (
              <FilterChip key={tag} label={tag} onRemove={() => onToggleTag(tag)} className="sm:min-h-8" />
            ))}
          </div>
        </div>

        {/* Row 2 (desktop): the four option buttons. */}
        <div className="hidden flex-wrap gap-2 sm:flex" role="group" aria-label="Filter options">
          <OptionButton label="Type" value={CONTENT_TYPE_LABEL[contentType]} expanded={openOption === 'type'} onClick={() => toggleOption('type')} />
          <OptionButton label="Sort by" value={sortOrder} expanded={openOption === 'sort'} onClick={() => toggleOption('sort')} />
          <OptionButton label="Tag" value={TAG_TYPE_LABEL[tagType]} expanded={openOption === 'tag-type'} onClick={() => toggleOption('tag-type')} />
          <OptionButton label="Filter tags" expanded={openOption === 'tag'} onClick={() => toggleOption('tag')} />
        </div>

        <Section legend="Type" className={sectionClass('type')}>
          <div className="grid grid-cols-3">
            {CONTENT_TYPE_OPTIONS.map((option) => (
              <Choice key={option} selected={contentType === option} onClick={() => onToggleContentType(option)}>
                {CONTENT_TYPE_LABEL[option]}
              </Choice>
            ))}
          </div>
        </Section>

        <Section legend="Sort" className={sectionClass('sort')}>
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {SORT_ORDER_OPTIONS.map((option) => (
              <Choice key={option} selected={sortOrder === option} onClick={() => onToggleSortOrder(option)}>
                {option}
              </Choice>
            ))}
          </div>
        </Section>

        <Section legend="Tag type" className={sectionClass('tag-type')}>
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {TAG_TYPE_OPTIONS.map((option) => (
              <Choice key={option} selected={tagType === option} onClick={() => onToggleTagType(option)}>
                {TAG_TYPE_LABEL[option]}
              </Choice>
            ))}
          </div>
        </Section>

        <Section legend="Tags" className={sectionClass('tag')}>
          {allTags.length === 0 ? (
            <p className={LABEL_FADED}>No tags for this selection</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => {
                const selected = tags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => onToggleTag(tag)}
                    className={`${CONTROL} ${CONTROL_PRESSED} min-h-11 px-3 sm:min-h-8`}
                  >
                    {selected && <span aria-hidden="true">✓ </span>}
                    {tag}
                  </button>
                );
              })}
            </div>
          )}
        </Section>

        {/* Mobile bottom bar: the live result count closes the filter. */}
        {mobileOpen && (
          <div className="sticky bottom-0 -mx-(--margin-mobile) flex gap-2 border-t border-lmPrimary bg-lmBg px-(--margin-mobile) py-3 sm:hidden dark:border-dmPrimary dark:bg-dmBg">
            <button type="button" onClick={() => setMobileOpen(false)} className={`${BUTTON_PRIMARY} min-h-12 flex-1`}>
              Show {resultCount} {resultCount === 1 ? 'result' : 'results'}
            </button>
            {resetButton('flex min-h-12')}
          </div>
        )}
      </div>
    </section>
  );
}
