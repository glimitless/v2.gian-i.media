import ArchiveNav from '@/components/archive/archive-nav';
import RailLayout from '@/components/archive/rail-layout';
import { findArchiveIDRecord } from '@/lib/archive/archive-ids';
import { findArchiveNoteRecord, findArchiveNoteMetadata } from '@/lib/archive/archive-notes';
import type { GroupIdArgs } from '@/types/archive';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NoteBody from '@/components/note/note-body';
import archiveNoteIDsJson from '@/data/notes/archive-note-ids.json';

export const dynamicParams = false;
export function generateStaticParams() {
  return archiveNoteIDsJson.map((note) => ({
      noteId: note.id
  }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { noteId } = await params;
  return findArchiveNoteMetadata(noteId);
}

type NotePageProps = {
  params: Promise<{noteId: GroupIdArgs}>
}

export default async function NotePage({ params } : NotePageProps){
  const type = 'notes';
  const { noteId } = await params;
  const archiveIDRecord = findArchiveIDRecord(noteId, type);
  if(!archiveIDRecord) notFound();

  const archiveNoteRecord = findArchiveNoteRecord(noteId);
  if(!archiveNoteRecord) notFound();

  return (
    <RailLayout nav={<ArchiveNav currentId={noteId} />}>
      <NoteBody
        title={archiveIDRecord.title}
        subtitle={archiveNoteRecord.content.subtitle}
        overview={archiveNoteRecord.content.description}
        sections={archiveNoteRecord.content.sections}
        noteId={noteId}
      />
    </RailLayout>
  )
}
