// Shared class strings for the Specimen components. Colour is always an lm/dm pair.
// Kept as full literal strings so Tailwind's scanner sees every class.

/** Display heading that steps down per band: xs <360, m 360–639, t 640–1023, display ≥1024 (each with its font-stretch). */
export const DISPLAY_HEADING =
  'font-text text-displayMobile font-stretch-108% text-lmPrimary max-xs:text-displayXs sm:text-displayTablet sm:font-stretch-110% lg:text-display lg:font-stretch-112% dark:text-dmPrimary';

/** a-title section head: 30/34 below 640 (as in the frames), 44/48 from 640. */
export const TITLE_HEADING =
  'font-text text-title font-stretch-105% text-lmPrimary max-sm:text-[1.875rem] max-sm:leading-[2.125rem] dark:text-dmPrimary';

/** Work / collection page title: a-title, 34/38 below 640 (PageWork, PageCollection frames). */
export const PAGE_TITLE =
  'font-text text-title font-stretch-105% text-lmPrimary max-sm:text-[2.125rem] max-sm:leading-[2.375rem] dark:text-dmPrimary';

/** Mono metadata in fadedText / accentInk. */
export const LABEL_FADED = 'a-label text-lmFadedText dark:text-dmFadedText';
export const LABEL_ACCENT = 'a-label text-lmAccentInk dark:text-dmAccentInk';

/** Running text link: primary with a 1px fadedText underline at 4px offset. Hover: accentInk, 2px underline. */
export const TEXT_LINK =
  'text-lmPrimary underline decoration-lmFadedText decoration-1 underline-offset-4 transition-[text-decoration-thickness,color] duration-(--duration-hover) ease-snap hover:text-lmAccentInk hover:decoration-2 dark:text-dmPrimary dark:decoration-dmFadedText dark:hover:text-dmAccentInk';

/** Breadcrumb / back link set in a-label. */
export const BACK_LINK =
  'a-label w-fit text-lmSecondary underline decoration-lmFadedText underline-offset-4 hover:text-lmAccentInk dark:text-dmSecondary dark:hover:text-dmAccentInk';

/** Primary button: primary fill, bg text. Hover: accent fill, onAccent text and the 4px hard offset. Press: translate 2px and collapse the offset. */
export const BUTTON_PRIMARY =
  'a-button inline-flex min-h-11 items-center justify-center gap-2 bg-lmPrimary px-5 text-lmBg transition-[background-color,color,box-shadow,translate] duration-(--duration-hover) ease-snap hover:bg-lmAccent hover:text-lmOnAccent hover:shadow-lmRaised active:translate-[2px_2px] active:shadow-none dark:bg-dmPrimary dark:text-dmBg dark:hover:bg-dmAccent dark:hover:text-dmOnAccent dark:hover:shadow-dmRaised';

/** Secondary button: transparent with a 1px primary border. Hover: bgActive plus shadowRaised. */
export const BUTTON_SECONDARY =
  'a-button inline-flex min-h-11 items-center justify-center gap-2 border border-lmPrimary bg-transparent px-5 text-lmPrimary transition-[background-color,box-shadow,translate] duration-(--duration-hover) ease-snap hover:bg-lmBgActive hover:shadow-lmRaised active:translate-[2px_2px] active:shadow-none dark:border-dmPrimary dark:text-dmPrimary dark:hover:bg-dmBgActive dark:hover:shadow-dmRaised';

/** Outlined a-label control with a 1px fadedText (3:1) edge: Reset, filter choices, tags. Add a min-height at the call site. */
export const CONTROL =
  'a-label border border-lmFadedText text-lmPrimary transition-colors duration-(--duration-hover) ease-snap hover:bg-lmBgActive dark:border-dmFadedText dark:text-dmPrimary dark:hover:bg-dmBgActive';

/** Selected state for a CONTROL with aria-pressed: filled primary (the check is rendered as text). */
export const CONTROL_PRESSED =
  'aria-pressed:border-lmPrimary aria-pressed:bg-lmPrimary aria-pressed:text-lmBg dark:aria-pressed:border-dmPrimary dark:aria-pressed:bg-dmPrimary dark:aria-pressed:text-dmBg';

/** Removable filter chip: 1px primary edge with a × glyph. */
export const CHIP =
  'a-label flex min-h-11 items-center gap-2 border border-lmPrimary px-3 text-lmPrimary hover:bg-lmBgActive dark:border-dmPrimary dark:text-dmPrimary dark:hover:bg-dmBgActive';

/** Hairline rule colour for structure (medium is decorative, not text). */
export const RULE = 'border-lmMedium dark:border-dmMedium';
/** Primary rule that opens a section. */
export const RULE_PRIMARY = 'border-lmPrimary dark:border-dmPrimary';
