export const CONTACT_LINKS = [
  { label: 'GitHub', href: 'https://github.com/glimitless' },
  { label: 'Instagram', href: 'https://www.instagram.com/gian.immanuel/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/giancambridge/' },
];

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-lmMedium pt-6 pb-10 dark:border-dmMedium">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
        <span className="a-label text-lmFadedText dark:text-dmFadedText">Gian-I Cambridge — Toronto, ON</span>
        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          {CONTACT_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-small text-lmPrimary underline decoration-lmFadedText underline-offset-4 decoration-1 hover:text-lmAccentInk hover:decoration-2 dark:text-dmPrimary dark:decoration-dmFadedText dark:hover:text-dmAccentInk"
              >
                {link.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
