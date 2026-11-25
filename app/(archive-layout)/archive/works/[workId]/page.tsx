import { notFound } from 'next/navigation';
import { findArchiveIDRecord } from '@/lib/archive/archive-ids';
import { findArchiveWorkRecord, findArchiveWorkMetadata } from '@/lib/archive/archive-works';
import renderContentBody from '@/lib/content-array/render-content-body';
import WorkCollectionsGrid from '@/components/work/work-collections-grid';
import ArchiveNav from '@/components/archive/archive-nav';
import Breadcrumb from '@/components/archive/breadcrumb';
import Disclosure from '@/components/archive/disclosure';
import { formatArchiveDate } from '@/components/archive/format-archive-date';
import archiveWorkIDsJson from '@/data/works/archive-work-ids.json';
import { LABEL_FADED, PAGE_TITLE } from '@/lib/ui/classes';
import type { Metadata } from 'next';

export const dynamicParams = false;
export function generateStaticParams(){
  return archiveWorkIDsJson.map((work) => ({
    workId: work.id
  }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { workId } = await params;
  return findArchiveWorkMetadata(workId)
}

type WorkPageProps = {
  params: Promise< {workId:string }>
}

// Columns: overview 1–4 · media 5–12 with the nav under it (1024) · from 1280 media 5–11 and the nav rail in 12.
export default async function WorkPage({ params }: WorkPageProps){
  const type = 'works';
  const { workId } = await params;
  const archiveIDRecord = findArchiveIDRecord(workId, type);
  const work = findArchiveWorkRecord(workId);
  if(!archiveIDRecord || !work) notFound();

  const count = work.content.collectionLinks.length;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-12 pt-12 pb-16 sm:grid-cols-12 sm:gap-x-6">
      <div className="flex flex-col gap-6 sm:col-span-9 lg:col-span-4">
        <Breadcrumb items={[{ label: 'Archive', href: '/archive' }, { label: 'Works' }]} />
        <div className="flex flex-col gap-3 border-b border-lmMedium pb-6 dark:border-dmMedium">
          <h1 className={PAGE_TITLE}>{archiveIDRecord.title}</h1>
          <span className={LABEL_FADED}>
            {formatArchiveDate(archiveIDRecord.date)} · {count} {count === 1 ? 'COLLECTION' : 'COLLECTIONS'}
          </span>
        </div>
        <div className="flex flex-col gap-4">{renderContentBody(work.content.description)}</div>
      </div>

      <div className="flex flex-col gap-12 sm:col-span-12 lg:col-span-8 xl:col-span-7">
        <WorkCollectionsGrid collections={work.content.collectionLinks} workId={workId} />
        {work.content.descriptionEXP && (
          <div className="border-t border-lmPrimary dark:border-dmPrimary">
            <Disclosure title="Long description">
              <div className="flex flex-col gap-4">{renderContentBody(work.content.descriptionEXP)}</div>
            </Disclosure>
          </div>
        )}
      </div>

      <div className="sm:col-span-12 lg:col-span-8 lg:col-start-5 xl:col-span-1 xl:col-start-auto">
        <ArchiveNav currentId={workId} />
      </div>
    </div>
  )
}
