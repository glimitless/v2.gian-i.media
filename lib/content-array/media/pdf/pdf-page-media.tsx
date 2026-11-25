'use client';

import type { MediaPartArgs } from '@/types/content-body';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import mediaURL from '@/lib/media-url/media-url';

type PDFPageMediaProps = {
  page: MediaPartArgs;
  className?: string;
  onLoad?: () => void;
  isActive: boolean;
};

export default function PDFPageMedia({ page, className, onLoad, isActive }: PDFPageMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || page.type !== 'video') return;
    // Seeking clears the browser's poster; load() rewinds and restores it.
    if (!isActive && (video.currentTime > 0 || !video.paused)) {
      video.pause();
      video.load();
    }
  }, [isActive, page]);

  if (page.type === 'image') {
    return (
      <Image
        className={className ?? 'h-full w-full max-h-full max-w-full object-contain'}
        src={mediaURL(page.src, 'image')}
        alt={page.alt}
        width={page.width}
        height={page.height}
        onLoad={onLoad}
      />
    );
  }

  if (page.type === 'video') {
    return (
      <video
        ref={videoRef}
        className={`h-full w-full max-h-full max-w-full object-contain ${className ?? ''}`}
        src={`/video/${page.src}`}
        poster={`/posters/${page.poster}`}
        controls={page.controls}
        loop={page.loop}
        muted={page.muted}
        autoPlay={false}
        playsInline
        preload="metadata"
      />
    );
  }

  return null;
}
