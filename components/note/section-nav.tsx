import Link from 'next/link';
import type { GroupIdArgs, NoteSectionRecord } from '@/types/archive';
import { BUTTON_SECONDARY } from '@/lib/ui/classes';

/** Prev / Next section. Prev only: left. Next only: right. Both: space-between. */
export default function NoteSectionNav({
  noteId,
  previous,
  next,
}: {
  noteId: GroupIdArgs;
  previous: NoteSectionRecord | undefined;
  next: NoteSectionRecord | undefined;
}) {
  if (!previous && !next) return null;
  return (
    <nav aria-label="Note sections" className="flex flex-wrap items-stretch justify-between gap-4 border-t border-lmPrimary pt-6 dark:border-dmPrimary">
      {previous ? (
        <Link href={`/archive/notes/${noteId}/${previous.id}`} className={`${BUTTON_SECONDARY} h-auto flex-col items-start gap-1 py-3 text-left`}>
          <span className="a-label text-lmFadedText dark:text-dmFadedText">← Previous section</span>
          <span>{previous.content.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`/archive/notes/${noteId}/${next.id}`} className={`${BUTTON_SECONDARY} ml-auto h-auto flex-col items-end gap-1 py-3 text-right`}>
          <span className="a-label text-lmFadedText dark:text-dmFadedText">Next section →</span>
          <span>{next.content.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
