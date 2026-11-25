import ArchiveNav from '@/components/archive/archive-nav';
import RailLayout from '@/components/archive/rail-layout';
import { findArchiveIDRecord } from '@/lib/archive/archive-ids';
import { findArchiveNoteSectionContent, findArchiveNoteRecord, getNoteSectionNeighbors, findArchiveNoteMetadata } from '@/lib/archive/archive-notes';
import type { GroupIdArgs, IndividualIdArgs } from '@/types/archive';
import { notFound } from 'next/navigation';
import NoteSectionBody from '@/components/note/note-section-body';
import archiveNoteIDsJson from '@/data/notes/archive-note-ids.json';
import type { Metadata } from 'next';

export const dynamicParams = false;
export function generateStaticParams() {
  return archiveNoteIDsJson.flatMap((note) =>
    note.sections.map((section) => ({
      noteId: note.id,
      sectionId: section.id
    }))
  );
}

export async function generateMetadata({ params }: NoteSectionPageProps): Promise<Metadata> {
  const { noteId, sectionId } = await params;
  return findArchiveNoteMetadata(noteId, sectionId);
}

type NoteSectionPageProps =  {
  params: Promise<{noteId:GroupIdArgs, sectionId:IndividualIdArgs}>
}

export default async function NoteSectionPage({ params }:NoteSectionPageProps){
  const type = 'notes';
  const { noteId, sectionId } = await params;

  const archiveIDRecord = findArchiveIDRecord(noteId, type);
  const archiveNoteRecord = findArchiveNoteRecord(noteId);
  if(!archiveIDRecord || !archiveNoteRecord) notFound();

  const neighbors = getNoteSectionNeighbors(archiveNoteRecord.content.sections, sectionId);
  if(!neighbors) notFound();

  const archiveNoteSectionContent = findArchiveNoteSectionContent(noteId, sectionId);
  if(!archiveNoteSectionContent) notFound();

  return (
    <RailLayout nav={<ArchiveNav currentId={noteId} />}>
      <NoteSectionBody
        noteId={noteId}
        noteTitle={archiveIDRecord.title}
        sectionTitle={neighbors.current.content.title}
        blocks={archiveNoteSectionContent.blocks}
        blockLinks={neighbors.current.content.blocks}
        previous={neighbors.previous}
        next={neighbors.next}
      />
    </RailLayout>
  )
}
