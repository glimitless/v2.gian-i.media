import { CHIP } from '@/lib/ui/classes';

/** Removable filter chip used by the filter panel and the 0-results state. */
export default function FilterChip({ label, onRemove, className = '' }: { label: string; onRemove: () => void; className?: string }) {
  return (
    <button type="button" onClick={onRemove} aria-label={`Remove filter ${label}`} className={`${CHIP} ${className}`}>
      <span>{label}</span>
      <span aria-hidden="true">×</span>
    </button>
  );
}
