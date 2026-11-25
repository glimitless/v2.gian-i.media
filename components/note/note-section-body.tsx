import Link from 'next/link';
import renderContentBody from '@/lib/content-array/render-content-body';
import { formatArchiveDate } from '@/components/archive/format-archive-date';
import NoteSectionNav from './section-nav';
import ScrollToBlock from './scroll-to-block';
import { DISPLAY_HEADING, TITLE_HEADING } from '@/lib/ui/classes';
import type { ArchiveNoteBlock, GroupIdArgs, NoteSectionBlockLink, NoteSectionRecord } from '@/types/archive';

/** A note section: title, the note it belongs to, then each block as a numbered article. */
export default function NoteSectionBody({
  noteId,
  noteTitle,
  sectionTitle,
  blocks,
  blockLinks,
  previous,
  next,
  blockId,
}: {
  noteId: GroupIdArgs;
  noteTitle: string;
  sectionTitle: string;
  blocks: ArchiveNoteBlock[];
  blockLinks: NoteSectionBlockLink[];
  previous: NoteSectionRecord | undefined;
  next: NoteSectionRecord | undefined;
  blockId?: string;
}) {
  const total = blocks.length;
  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div className="flex flex-col gap-3">
          <h1 className={DISPLAY_HEADING}>{sectionTitle}</h1>
          <Link href={`/archive/notes/${noteId}`} className="font-text text-subtitle text-lmSecondary underline decoration-lmFadedText underline-offset-4 hover:text-lmAccentInk dark:text-dmSecondary dark:hover:text-dmAccentInk">
            {noteTitle}
          </Link>
        </div>
        <span className="a-label text-lmFadedText dark:text-dmFadedText">
          {String(total).padStart(2, '0')} {total === 1 ? 'BLOCK' : 'BLOCKS'}
        </span>
      </header>

      {blocks.map((block, i) => {
        const link = blockLinks[i];
        return (
          <article key={block.id} id={block.id} className="grid scroll-mt-6 gap-6 border-t border-lmPrimary pt-6 lg:grid-cols-10 lg:gap-x-6 dark:border-dmPrimary">
            <span className="a-label text-lmAccentInk lg:col-span-2 dark:text-dmAccentInk">
              BLOCK {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-4 lg:col-span-8">
              <div className="flex flex-col gap-2">
                <h2 className={TITLE_HEADING}>{link.content.title}</h2>
                <span className="a-label text-lmFadedText dark:text-dmFadedText">{formatArchiveDate(link.content.date)}</span>
              </div>
              <div className="flex flex-col gap-4">{renderContentBody(block.items)}</div>
            </div>
          </article>
        );
      })}

      {blockId && <ScrollToBlock blockId={blockId} />}

      <NoteSectionNav noteId={noteId} previous={previous} next={next} />
    </div>
  );
}
