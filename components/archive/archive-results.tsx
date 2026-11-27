'use client';

import Link from 'next/link';
import { memo, useMemo, useState } from 'react';
import { useFilterContext } from '@/lib/filter/filter-provider';
import type { ArchiveID } from '@/types/archive';
import type { TagArgs, TagTypeArgs } from '@/types/filter';
import { formatArchiveDate } from './format-archive-date';
import FilterChip from './filter-chip';
import { BUTTON_PRIMARY, LABEL_FADED } from '@/lib/ui/classes';

const VISIBLE_TAGS = 3;

// Row and column-header tracks per band (spec.md §Layout and breakpoints: Archive row).
const ROW_TRACKS =
  'grid grid-cols-[64px_minmax(0,1fr)] gap-x-4 sm:grid-cols-[40px_96px_minmax(0,1fr)_104px] lg:grid-cols-[40px_96px_minmax(0,1fr)_72px_240px_96px_24px] xl:grid-cols-[40px_96px_minmax(0,1fr)_72px_300px_110px_24px] xl:gap-x-6';

function RowTags({ tags, activeTags, onToggleTag }: { tags: TagArgs[]; activeTags: TagArgs[]; onToggleTag: (tag: TagArgs) => void }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? tags : tags.slice(0, VISIBLE_TAGS);
  const hidden = tags.length - shown.length;

  // Mono tags with a fadedText underline; each is a button that toggles the tag filter. Selected = filled primary with a check.
  return (
    <span className="a-label relative z-10 flex flex-wrap items-center gap-x-1.5 gap-y-1.5 text-lmSecondary dark:text-dmSecondary">
      {shown.map((tag, i) => {
        const selected = activeTags.includes(tag);
        return (
          <span key={tag} className="inline-flex items-center gap-1.5">
            <button
              type="button"
              aria-pressed={selected}
              onClick={() => onToggleTag(tag)}
              className={`text-left uppercase underline decoration-lmFadedText underline-offset-4 transition-colors duration-(--duration-hover) ease-snap hover:text-lmAccentInk dark:decoration-dmFadedText dark:hover:text-dmAccentInk ${
                selected ? 'bg-lmPrimary px-1 text-lmBg no-underline hover:text-lmBg dark:bg-dmPrimary dark:text-dmBg dark:hover:text-dmBg' : ''
              }`}
            >
              {selected && <span aria-hidden="true">✓ </span>}
              {tag}
            </button>
            {i < shown.length - 1 && <span aria-hidden="true" className="text-lmFadedText dark:text-dmFadedText">·</span>}
          </span>
        );
      })}
      {hidden > 0 && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-label={`Show ${hidden} more tags`}
          onClick={() => setExpanded(true)}
          className="border border-lmFadedText px-1.5 text-lmPrimary hover:bg-lmBgActive dark:border-dmFadedText dark:text-dmPrimary dark:hover:bg-dmBgActive"
        >
          +{hidden}
        </button>
      )}
    </span>
  );
}

/**
 * One archive row. Every cell renders once and is placed per band:
 * <640  64px thumb · stack (title, type · date, tags)
 * 640+  40 · 96 · 1fr · 104 (type and tags under the title)
 * 1024+ 40 · 96 · 1fr · 72 · 240 · 96 · 24, 1280+ 40 · 96 · 1fr · 72 · 300 · 110 · 24
 */
const ArchiveRow = memo(function ArchiveRow({
  item,
  index,
  tagType,
  activeTags,
  onToggleTag,
}: {
  item: ArchiveID;
  index: number;
  tagType: TagTypeArgs;
  activeTags: TagArgs[];
  onToggleTag: (tag: TagArgs) => void;
}) {
  const Thumbnail = item.thumbnail;
  const tags = useMemo(
    () => [...(tagType === 'tools' ? item.tools : item.keywords)].sort((a, b) => a.localeCompare(b)),
    [item, tagType],
  );
  const typeLabel = item.type === 'notes' ? 'Note' : 'Work';
  const date = formatArchiveDate(item.date);

  return (
    <li className={`group relative grid items-start gap-y-1.5 border-b border-lmMedium py-3 transition-colors duration-(--duration-hover) ease-snap hover:bg-lmBgActive lg:items-center dark:border-dmMedium dark:hover:bg-dmBgActive ${ROW_TRACKS}`}>
      <span className={`${LABEL_FADED} hidden self-center sm:col-start-1 sm:row-span-3 sm:row-start-1 sm:block sm:pl-1 lg:row-span-1`}>
        {String(index + 1).padStart(2, '0')}
      </span>

      <span className="col-start-1 row-span-3 row-start-1 grid size-16 place-items-center bg-lmSurface sm:col-start-2 sm:size-24 sm:self-center lg:row-span-1 dark:bg-dmSurface">
        <Thumbnail
          aria-hidden="true"
          focusable="false"
          className="size-[88%] text-lmSecondary transition-colors duration-(--duration-hover) group-hover:text-lmAccentInk dark:text-dmSecondary dark:group-hover:text-dmAccentInk"
        />
      </span>

      <Link
        href={`/archive/${item.type}/${item.id}`}
        className="col-start-2 row-start-1 font-text text-base leading-5.25 font-semibold font-stretch-105% tracking-[-0.01em] text-lmPrimary after:absolute after:inset-0 after:content-[''] group-hover:text-lmAccentInk focus-visible:outline-none sm:col-start-3 sm:text-[1.25rem] sm:leading-6.5 lg:text-[1.375rem] lg:leading-7 dark:text-dmPrimary dark:group-hover:text-dmAccentInk"
      >
        {item.title}
      </Link>

      <span className={`${LABEL_FADED} col-start-2 row-start-2 sm:hidden`}>
        {typeLabel} · {date}
      </span>
      <span className={`${LABEL_FADED} hidden sm:col-start-3 sm:row-start-2 sm:block lg:col-start-4 lg:row-start-1`}>{typeLabel}</span>

      <div className="col-start-2 row-start-3 sm:col-start-3 lg:col-start-5 lg:row-start-1">
        <RowTags tags={tags} activeTags={activeTags} onToggleTag={onToggleTag} />
      </div>

      <span className={`${LABEL_FADED} hidden self-center sm:col-start-4 sm:row-span-3 sm:row-start-1 sm:block lg:col-start-6 lg:row-span-1`}>{date}</span>
      <span
        aria-hidden="true"
        className="hidden text-lmAccentInk opacity-0 transition-opacity duration-(--duration-hover) group-hover:opacity-100 lg:col-start-7 lg:row-start-1 lg:block dark:text-dmAccentInk"
      >
        →
      </span>
    </li>
  );
});

export default function ArchiveResults() {
  const { filteredArchiveIDs, filterArguments, isDefault, resetFilter, onToggleTag, onToggleTitleSearch, onToggleContentType, onToggleSortOrder, onToggleTagType } =
    useFilterContext();
  const { searchQuery, contentType, sortOrder, tagType, tags } = filterArguments;

  if (filteredArchiveIDs.length === 0) {
    return (
      <div className="flex flex-col gap-4 border-t border-lmMedium py-8 dark:border-dmMedium">
        <p className="a-label text-lmPrimary dark:text-dmPrimary">0 RESULTS</p>
        <div className="flex flex-wrap gap-2">
          {searchQuery !== '' && <FilterChip label={`“${searchQuery}”`} onRemove={() => onToggleTitleSearch('')} />}
          {contentType !== 'all' && <FilterChip label={contentType} onRemove={() => onToggleContentType('all')} />}
          {sortOrder !== 'Chronological' && <FilterChip label={sortOrder} onRemove={() => onToggleSortOrder('Chronological')} />}
          {tagType !== 'keywords' && <FilterChip label={`Tags: ${tagType}`} onRemove={() => onToggleTagType('keywords')} />}
          {tags.map((tag) => (
            <FilterChip key={tag} label={tag} onRemove={() => onToggleTag(tag)} />
          ))}
        </div>
        {!isDefault && (
          <button type="button" onClick={resetFilter} className={`${BUTTON_PRIMARY} w-fit`}>
            Reset filter
          </button>
        )}
      </div>
    );
  }

  const sortMark = sortOrder === 'Chronological' ? ' ↓' : sortOrder === 'Reverse Chronological' ? ' ↑' : '';
  const titleMark = sortOrder === 'Alphabetical' ? ' ↓' : sortOrder === 'Reverse Alphabetical' ? ' ↑' : '';
  const tagHeading = tagType === 'tools' ? 'Tools' : 'Keywords';

  return (
    <div>
      {/* Column header (1024+), aligned to the row tracks. Decorative: the rows carry their own labels. */}
      <div aria-hidden="true" className={`${LABEL_FADED} hidden border-b border-lmPrimary pb-3 lg:grid dark:border-dmPrimary ${ROW_TRACKS}`}>
        <span className="pl-1">No.</span>
        <span>Fig.</span>
        <span>Title{titleMark}</span>
        <span>Type</span>
        <span>{tagHeading}</span>
        <span>Date{sortMark}</span>
        <span />
      </div>
      <ul aria-label="Archive results" className="flex flex-col border-t border-lmPrimary lg:border-t-0 dark:border-dmPrimary">
        {filteredArchiveIDs.map((item, index) => (
          <ArchiveRow key={`${item.type}-${item.id}`} item={item} index={index} tagType={tagType} activeTags={tags} onToggleTag={onToggleTag} />
        ))}
      </ul>
    </div>
  );
}
