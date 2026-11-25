import Link from 'next/link';
import Image from 'next/image';
import mediaURL from '@/lib/media-url/media-url';
import type { WorkCollectionLink, GroupIdArgs } from '@/types/archive';
import { LABEL_FADED } from '@/lib/ui/classes';

/**
 * Collection tiles: the first two lead as large tiles, the rest follow smaller
 * (mobile: large one per row, small two across; 640+: 2-up then 3-up).
 * Each tile: 1:1 image, FIG. nn, title, medium. Hover: the 4px accent offset.
 */
export default function WorkCollectionsGrid({ collections, workId }: { collections: WorkCollectionLink[]; workId: GroupIdArgs }) {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
      {collections.map((collection, i) => {
        const large = i < 2;
        const fig = `FIG. ${String(i + 1).padStart(2, '0')}`;
        return (
          <li key={collection.id} className={large ? 'col-span-2 sm:col-span-3' : 'col-span-1 sm:col-span-2'}>
            <Link href={`/archive/works/${workId}/${collection.id}`} aria-label={collection.title} className="group flex flex-col gap-3">
              <span className="block aspect-square w-full border border-lmMedium bg-lmSurface transition-shadow duration-(--duration-hover) ease-snap group-hover:shadow-lmRaised group-active:shadow-none dark:border-dmMedium dark:bg-dmSurface dark:group-hover:shadow-dmRaised">
                <Image src={mediaURL(collection.thumbnail, 'image')} alt={collection.alt} width={480} height={480} className="h-full w-full object-cover" />
              </span>
              <span className="flex flex-col gap-1">
                <span className={`${LABEL_FADED} flex flex-wrap justify-between gap-x-3`}>
                  <span>{fig}</span>
                  {large && <span>{collection.medium}</span>}
                </span>
                <span className="font-text text-[1.25rem] leading-6.5 font-semibold font-stretch-105% text-lmPrimary group-hover:text-lmAccentInk dark:text-dmPrimary dark:group-hover:text-dmAccentInk">
                  {collection.title}
                </span>
                {!large && <span className={LABEL_FADED}>{collection.medium}</span>}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
