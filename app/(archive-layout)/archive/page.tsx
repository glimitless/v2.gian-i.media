import ArchivePageBody from '@/components/archive/archive-page-body';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Archive',
  description: 'Browse the Gian-I Media archive: design works, collections, and process notes spanning branding, graphic design, digital experiences, and interactive media.'
};

export default async function ArchiveLandingPage() {
  return <ArchivePageBody />;
}
