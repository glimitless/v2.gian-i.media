import ArchiveNav from '@/components/archive/archive-nav';
import RailLayout from '@/components/archive/rail-layout';
import { findArchiveIDRecord } from '@/lib/archive/archive-ids';
import { findArchiveNoteSectionContent, findArchiveNoteRecord, getNoteSectionNeighbors, findArchiveNoteMetadata } from '@/lib/archive/archive-notes';
import type { GroupIdArgs, IndividualBlockIdArgs, IndividualIdArgs } from '@/types/archive';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NoteSectionBody from '@/components/note/note-section-body';
import archiveNoteIDsJson from '@/data/notes/archive-note-ids.json';

export const dynamicParams = false;

export function generateStaticParams(){
  return archiveNoteIDsJson.flatMap((note) =>
    note.sections.flatMap((section) =>
      section.blocks.map((block) => ({
        noteId: note.id,
        sectionId: section.id,
        blockId: block.id
      }))
    )
  );
}

export async function generateMetadata({ params }: NoteSectionBlockPageProps): Promise<Metadata> {
  const { noteId, sectionId, blockId } = await params;
  return findArchiveNoteMetadata(noteId, sectionId, blockId);
}

type NoteSectionBlockPageProps =  {
  params: Promise<{noteId:GroupIdArgs, sectionId:IndividualIdArgs, blockId:IndividualBlockIdArgs}>
}

export default async function NoteSectionBlockPage({ params }:NoteSectionBlockPageProps){
  const type = 'notes';
  const { noteId, sectionId, blockId } = await params;

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
        blockId={blockId}
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
