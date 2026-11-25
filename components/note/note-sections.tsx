import Link from 'next/link';
import Disclosure from '@/components/archive/disclosure';
import SpecSection from '@/components/archive/spec-section';
import { formatArchiveDate } from '@/components/archive/format-archive-date';
import { BUTTON_SECONDARY } from '@/lib/ui/classes';
import type { GroupIdArgs, NoteSectionRecord } from '@/types/archive';

/** One § group per section (numbered after the overview); each block is a disclosure row with its summary and Read →. */
export default function NoteSections({ sections, noteId, startIndex }: { sections: NoteSectionRecord[]; noteId: GroupIdArgs; startIndex: number }) {
  return (
    <>
      {sections.map((section, i) => (
        <SpecSection key={section.id} id={`section-${section.id}`} index={startIndex + i} title={section.content.title}>
          {section.content.blocks.map((block) => (
            <Disclosure key={block.id} title={block.content.title} meta={formatArchiveDate(block.content.date)} headingLevel={3}>
              <ul className="flex list-['—'] flex-col gap-2 pl-5 marker:text-lmAccentInk text-small text-lmSecondary dark:text-dmSecondary dark:marker:text-dmAccentInk">
                {block.content.summary.map((point, j) => (
                  <li key={j} className="pl-2">
                    {point}
                  </li>
                ))}
              </ul>
              <Link href={`/archive/notes/${noteId}/${section.id}/${block.id}`} className={`${BUTTON_SECONDARY} mt-5`}>
                Read →
              </Link>
            </Disclosure>
          ))}
        </SpecSection>
      ))}
    </>
  );
}
