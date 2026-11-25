import Link from 'next/link';
import { findArchiveIDRecord } from '@/lib/archive/archive-ids';
import type { GroupIdArgs, IndividualIdArgs } from '@/types/archive';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findArchiveWorkRecord, findArchiveWorkCollectionContent, findArchiveWorkMetadata } from '@/lib/archive/archive-works';
import renderContentBody from '@/lib/content-array/render-content-body';
import ArchiveNav from '@/components/archive/archive-nav';
import Breadcrumb from '@/components/archive/breadcrumb';
import archiveWorkIDsJson from '@/data/works/archive-work-ids.json';
import { LABEL_FADED, PAGE_TITLE, TEXT_LINK } from '@/lib/ui/classes';

export const dynamicParams = false;
export function generateStaticParams() {
  return archiveWorkIDsJson.flatMap((work) =>
    work.collections.map((collection) => ({
      workId: work.id,
      collectionId: collection.id
    }))
  );
}

export async function generateMetadata({ params }: WorkCollectionPageProps): Promise<Metadata> {
  const { workId, collectionId } = await params;
  return findArchiveWorkMetadata(workId, collectionId);
}

type WorkCollectionPageProps = {
  params: Promise<{workId:GroupIdArgs, collectionId:IndividualIdArgs}>
}

// Columns: overview 1–4 · media 5–12 with the nav under it (1024) · from 1280 media 5–10 and the nav rail in 11–12.
export default async function WorkCollectionPage({ params }:WorkCollectionPageProps){
  const type = 'works';
  const { workId, collectionId } = await params;

  const archiveIDRecord = findArchiveIDRecord(workId, type);
  const archiveWorkRecord = findArchiveWorkRecord(workId);
  if(!archiveIDRecord || !archiveWorkRecord) notFound();

  const links = archiveWorkRecord.content.collectionLinks;
  const index = links.findIndex((link) => link.id === collectionId);
  if (index === -1) notFound();
  const archiveWorkCollectionLink = links[index];

  const archiveWorkCollectionContent = findArchiveWorkCollectionContent(workId, collectionId);
  if(!archiveWorkCollectionContent) notFound();

  const previous = links[index - 1];
  const next = links[index + 1];
  const position = `${String(index + 1).padStart(2, '0')} / ${String(links.length).padStart(2, '0')}`;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-12 pt-12 pb-16 sm:grid-cols-12 sm:gap-x-6">
      <div className="flex flex-col gap-6 sm:col-span-9 lg:col-span-4">
        <Breadcrumb items={[{ label: 'Archive', href: '/archive' }, { label: 'Works' }, { label: archiveIDRecord.title, href: `/archive/works/${workId}` }]} />
        <div className="flex flex-col gap-3 border-b border-lmMedium pb-6 dark:border-dmMedium">
          <h1 className={PAGE_TITLE}>{archiveWorkCollectionLink.title}</h1>
          <span className={`${LABEL_FADED} flex justify-between gap-4`}>
            <span>{archiveWorkCollectionLink.medium}</span>
            <span>{position}</span>
          </span>
        </div>
        <div className="flex flex-col gap-4">{renderContentBody(archiveWorkCollectionContent.content.description)}</div>

        {(previous || next) && (
          <nav aria-label="Collections" className="flex flex-wrap justify-between gap-4 border-t border-lmMedium pt-4 dark:border-dmMedium">
            {previous ? (
              <Link href={`/archive/works/${workId}/${previous.id}`} className={`a-label ${TEXT_LINK}`}>
                ← {previous.title}
              </Link>
            ) : <span />}
            {next && (
              <Link href={`/archive/works/${workId}/${next.id}`} className={`a-label ${TEXT_LINK}`}>
                {next.title} →
              </Link>
            )}
          </nav>
        )}
      </div>

      <div className="flex flex-col gap-12 sm:col-span-12 lg:col-span-8 xl:col-span-6">
        {renderContentBody(archiveWorkCollectionContent.content.items)}
      </div>

      <div className="sm:col-span-12 lg:col-span-8 lg:col-start-5 xl:col-span-2 xl:col-start-auto">
        <ArchiveNav currentId={workId} workId={workId} collections={links} activeCollectionId={collectionId} />
      </div>
    </div>
  )
}
