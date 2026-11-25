import renderContentBody from '@/lib/content-array/render-content-body';
import type { ContentBlockArgs } from '@/types/content-body';
import type { GroupIdArgs, NoteSectionRecord } from '@/types/archive';
import NoteSections from './note-sections';
import SpecSection from '@/components/archive/spec-section';
import { DISPLAY_HEADING } from '@/lib/ui/classes';

// The overview reads as a-subtitle in primary (PageNote): restyle the renderer's paragraphs here.
const OVERVIEW =
  'flex flex-col gap-4 [&_p]:max-w-none [&_p]:text-subtitle [&_p]:font-medium [&_p]:text-lmPrimary dark:[&_p]:text-dmPrimary';

/** The note page: title and subtitle, § 01 overview, then one § per section. */
export default function NoteBody({
  title,
  subtitle,
  overview,
  sections,
  noteId,
}: {
  title: string;
  subtitle: string;
  overview: ContentBlockArgs[][];
  sections: NoteSectionRecord[];
  noteId: GroupIdArgs;
}) {
  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <h1 className={DISPLAY_HEADING}>{title}</h1>
        <p className="font-text text-subtitle font-medium text-lmSecondary dark:text-dmSecondary">{subtitle}</p>
      </header>
      <div>
        <SpecSection id="overview" index={1} title="Overview">
          <div className={OVERVIEW}>{renderContentBody(overview)}</div>
        </SpecSection>
        <NoteSections sections={sections} noteId={noteId} startIndex={2} />
      </div>
    </div>
  );
}
