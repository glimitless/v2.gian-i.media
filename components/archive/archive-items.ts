import { hydrateArchiveID } from '@/lib/archive/hydrate-archive-id';
import archiveIDsJson from '@/data/archive-ids.json';
import type { ArchiveID, ArchiveIDRecord } from '@/types/archive';

/** Every archive item with its SVG thumbnail resolved, hydrated once per server module graph. */
export const ARCHIVE_ITEMS: ArchiveID[] = (archiveIDsJson as ArchiveIDRecord[]).map(hydrateArchiveID);

export const ARCHIVE_ITEMS_BY_ID = new Map(ARCHIVE_ITEMS.map((item) => [item.id, item]));

/** Every item, newest first (the archive's default Chronological order). */
export const ARCHIVE_NEWEST_FIRST = [...ARCHIVE_ITEMS].sort((a, b) => Number(b.date) - Number(a.date));
