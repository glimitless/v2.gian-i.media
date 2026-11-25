import Link from 'next/link';
import { BUTTON_PRIMARY, DISPLAY_HEADING, LABEL_ACCENT } from '@/lib/ui/classes';

export default function NotFoundView({ href, label }: { href: string; label: string }) {
  return (
    <div className="flex flex-col gap-6 py-24">
      <span className={LABEL_ACCENT}>ERROR — 404</span>
      <h1 className={DISPLAY_HEADING}>Not found here.</h1>
      <Link href={href} className={`${BUTTON_PRIMARY} w-fit`}>
        {label}
      </Link>
    </div>
  );
}
