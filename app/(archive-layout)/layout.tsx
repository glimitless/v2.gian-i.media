import type { ReactNode } from 'react';
import FilterProvider from '@/lib/filter/filter-provider';

// Filter state lives for the archive route tree, so Back from a work keeps the same filter.
export default function ArchiveLayout({ children }: { children: ReactNode }) {
  return <FilterProvider>{children}</FilterProvider>;
}
