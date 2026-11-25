import Link from 'next/link';
import Image from 'next/image';
import mediaURL from '@/lib/media-url/media-url';
import { ARCHIVE_NEWEST_FIRST } from './archive-items';
import type { WorkCollectionLink } from '@/types/archive';
import { LABEL_FADED } from '@/lib/ui/classes';

/**
 * Archive navigation. Below 1280 it is a wrapping strip at the end of the page; from 1280 it is a
 * rail in its own column (one tile column, or collections + archive side by side on a collection page).
 * The current collection is outlined in accent; the current archive item is inverted.
 */
export default function ArchiveNav({
  currentId,
  workId,
  collections,
  activeCollectionId,
}: {
  currentId?: string;
  workId?: string;
  collections?: WorkCollectionLink[];
  activeCollectionId?: string;
}) {
  const hasCollections = Boolean(collections && workId);
  return (
    <nav aria-label="Archive navigation" className={`flex flex-col gap-8 ${hasCollections ? 'xl:grid xl:grid-cols-2 xl:items-start xl:gap-2' : ''}`}>
      {hasCollections && (
        <div className="flex flex-col gap-3">
          <span className={LABEL_FADED}>Collections</span>
          <ul className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-1">
            {collections!.map((collection) => {
              const active = collection.id === activeCollectionId;
              return (
                <li key={collection.id}>
                  <Link
                    href={`/archive/works/${workId}/${collection.id}`}
                    aria-label={collection.title}
                    aria-current={active ? 'page' : undefined}
                    className={`relative block aspect-square bg-lmSurface outline-2 -outline-offset-2 dark:bg-dmSurface ${
                      active ? 'outline-lmAccent dark:outline-dmAccent' : 'outline-transparent'
                    }`}
                  >
                    <Image src={mediaURL(collection.thumbnail, 'image')} alt="" width={480} height={480} className="h-full w-full object-cover" />
                    {!active && (
                      <span aria-hidden="true" className="absolute inset-0 bg-lmBg/55 transition-opacity duration-(--duration-dim) ease-out hover:opacity-0 dark:bg-dmBg/55" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <span className={LABEL_FADED}>Archive</span>
        <ul className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-1">
          {ARCHIVE_NEWEST_FIRST.map((item) => {
            const active = item.id === currentId;
            const Thumbnail = item.thumbnail;
            return (
              <li key={`${item.type}-${item.id}`}>
                <Link
                  href={`/archive/${item.type}/${item.id}`}
                  aria-label={item.title}
                  aria-current={active ? 'page' : undefined}
                  className={`grid aspect-square place-items-center transition-colors duration-(--duration-hover) ease-snap ${
                    active
                      ? 'bg-lmPrimary text-lmBg dark:bg-dmPrimary dark:text-dmBg'
                      : 'bg-lmSurface text-lmSecondary hover:text-lmAccentInk dark:bg-dmSurface dark:text-dmSecondary dark:hover:text-dmAccentInk'
                  }`}
                >
                  <Thumbnail aria-hidden="true" focusable="false" className="size-[84%]" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
