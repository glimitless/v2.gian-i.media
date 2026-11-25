import Link from 'next/link';
import { Fragment } from 'react';

type Crumb = { label: string; href?: string };

/** "ARCHIVE / WORKS / TIME /" — mono trail; linked crumbs carry the text-link underline. */
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="a-label text-lmSecondary dark:text-dmSecondary">
      <ol className="flex flex-wrap gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <Fragment key={item.label}>
            <li>
              {item.href ? (
                <Link
                  href={item.href}
                  className={`underline-offset-4 hover:text-lmAccentInk dark:hover:text-dmAccentInk ${
                    i === items.length - 1 ? 'text-lmPrimary underline decoration-lmFadedText dark:text-dmPrimary dark:decoration-dmFadedText' : 'hover:underline'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                item.label
              )}
            </li>
            <li aria-hidden="true">/</li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
