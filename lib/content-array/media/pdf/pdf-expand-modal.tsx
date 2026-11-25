'use client';

import { PDF_BUTTON } from './pdf-direction-controls';

type PDFExpandModalProps = {
  setIsOpen: (open: boolean) => void;
  variant: 'maximize' | 'minimize';
};

export default function PDFExpandModal({ setIsOpen, variant }: PDFExpandModalProps) {
  const isMaximize = variant === 'maximize';
  return (
    <button
      type="button"
      className={PDF_BUTTON}
      onClick={() => setIsOpen(isMaximize)}
      aria-label={isMaximize ? 'Expand PDF viewer' : 'Close full screen PDF viewer'}
    >
      <span aria-hidden="true">{isMaximize ? '⤢' : '✕'}</span>
    </button>
  );
}
