import type { MetadataRoute } from 'next';
import archiveWorkIDsJson from '@/data/works/archive-work-ids.json';
import archiveNoteIDsJson from '@/data/notes/archive-note-ids.json';
import { SITE_URL } from '@/lib/site-url/site-url';

/* 
  Mirrors the generateStaticParams of routes.
  Note section blocks are left out as they render the entire section's content.
*/
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '',
    '/archive',
    '/resume',
    ...archiveWorkIDsJson.flatMap((work) => [
      `/archive/works/${work.id}`,
      ...work.collections.map((collection) => 
        `/archive/works/${work.id}/${collection.id}`
      )
    ]),
    ...archiveNoteIDsJson.flatMap((note) => [
      `/archive/notes/${note.id}`,
      ...note.sections.map((section) => 
        `/archive/notes/${note.id}/${section.id}`
      )
    ])
  ];
  // Rendered as a static /sitemap.xml at build time
  return paths.map((path) => ({
    url: `${SITE_URL}${path}`
  }))
}