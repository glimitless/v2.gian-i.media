'use client';

import type { ComponentProps, ReactElement } from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

type ImageContainerProps = {
  children: ReactElement<ComponentProps<typeof Image>, typeof Image>;
  aspect: string;
  src: string;
  width: number;
  height: number;
  alt: string;
};

export default function ImageContainer({ children, aspect, src, width, height, alt }: ImageContainerProps) {
  const [isImgOpen, setIsImgOpen] = useState<boolean>(false);
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!isImgOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' || event.key === 'Enter') {
        event.preventDefault();
        setIsImgOpen(false);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isImgOpen]);

  return (
    <>
      <button
        type="button"
        style={{ aspectRatio: aspect }}
        onClick={() => {
          setIsImgLoaded(false);
          setIsImgOpen(true);
        }}
        aria-label={`Open image: ${alt}`}
        className="flex w-full cursor-zoom-in flex-col border border-lmMedium bg-lmSurface leading-none dark:border-dmMedium dark:bg-dmSurface"
      >
        {children}
      </button>
      {isImgOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-lmBg/95 p-4 dark:bg-dmBg/95"
            onClick={() => setIsImgOpen(false)}
          >
            <button
              type="button"
              className="a-label absolute top-4 right-4 z-10 flex h-11 items-center px-3 text-lmPrimary dark:text-dmPrimary"
              aria-label="Close image"
              onClick={() => setIsImgOpen(false)}
            >
              Close ✕
            </button>
            {!isImgLoaded && <span className="a-label absolute text-lmFadedText dark:text-dmFadedText">Loading</span>}
            <Image
              className={`${isImgLoaded ? 'opacity-100' : 'opacity-0'} h-auto max-h-[90vh] w-auto max-w-[95vw] transition-opacity duration-(--duration-dim)`}
              src={src}
              alt={alt}
              onClick={(e) => e.stopPropagation()}
              onLoad={() => setIsImgLoaded(true)}
              width={width}
              height={height}
            />
          </div>,
          document.body,
        )}
    </>
  );
}
