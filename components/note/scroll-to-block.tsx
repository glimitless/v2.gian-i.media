'use client';

import { useEffect } from 'react';

/** Deep link: when a block route loads, bring that block to the top of the page. */
export default function ScrollToBlock({ blockId }: { blockId: string }) {
  useEffect(() => {
    const element = document.getElementById(blockId);
    if (!element) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [blockId]);
  return null;
}
