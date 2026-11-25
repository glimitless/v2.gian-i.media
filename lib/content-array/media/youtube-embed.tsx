'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function YoutubeEmbed({ videoId, title, aspect }: { videoId: string; title: string; aspect: string }) {
  const [active, setActive] = useState<boolean>(false);
  const label = title || 'YouTube video';

  if (active) {
    return (
      <iframe
        className="block w-full border-0 border border-lmMedium dark:border-dmMedium"
        style={{ aspectRatio: aspect }}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={label}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      style={{ aspectRatio: aspect }}
      className="group relative block w-full cursor-pointer border border-lmMedium bg-lmSurface p-0 dark:border-dmMedium dark:bg-dmSurface"
      onClick={() => setActive(true)}
      aria-label={`Play ${label}`}
    >
      <Image
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover"
        width={0}
        height={0}
      />
      <span
        aria-hidden="true"
        className="a-label pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-lmPrimary px-4 py-2 text-lmBg group-hover:bg-lmAccent group-hover:text-lmOnAccent dark:bg-dmPrimary dark:text-dmBg dark:group-hover:bg-dmAccent dark:group-hover:text-dmOnAccent"
      >
        Play
      </span>
    </button>
  );
}
