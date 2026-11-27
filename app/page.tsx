import Link from 'next/link';
import Image from 'next/image';
import mediaURL from '@/lib/media-url/media-url';
import { formatArchiveDate } from '@/components/archive/format-archive-date';
import { ARCHIVE_ITEMS, ARCHIVE_ITEMS_BY_ID } from '@/components/archive/archive-items';
import { BUTTON_PRIMARY, DISPLAY_HEADING, TITLE_HEADING } from '@/lib/ui/classes';
import archiveWorkIDsJson from '@/data/works/archive-work-ids.json';

const WORK_COUNT = ARCHIVE_ITEMS.filter((item) => item.type === 'works').length;
const NOTE_COUNT = ARCHIVE_ITEMS.filter((item) => item.type === 'notes').length;
const META_DESCRIPTION = new Map(archiveWorkIDsJson.map((work) => [work.id, work.metaDescription]));

// Home order: portrait intro → three disciplines (named in full) → Selected works.
const DISCIPLINES = [
  {
    title: 'Brand & Graphic Design',
    detail: 'Identities for Parlour, Paypr and Rocket Science Ltd., and posters, signage and an exhibition for Design Photography.',
  },
  {
    title: 'Product & UI Design & Development',
    detail: 'The GazettE at AXXS Digital, plus sites I design and code: SensingChange, Visualizing Science’s planetary archive, and this portfolio.',
  },
  {
    title: 'Interactive Media',
    detail: 'A live visualization for the TIME: Unwinding the Spiral exhibition and an Arduino controller prototype for Visualizing Science.',
  },
];

const FEATURED = [
  {
    id: 'time-unwinding-the-spiral',
    kicker: '01 — Interactive Media',
    image: 'time-unwinding-the-spiral/spiral-hourglass/gc_spiral-hourglass-thumbnail.webp',
  },
  {
    id: 'sensing-change',
    kicker: '02 — Brand · Design & Development',
    image: 'sensing-change/website/gc_scyu-website-thumbnail.webp',
  },
  {
    id: 'axxs-digital',
    kicker: '03 — Product & UI · Brand',
    image: 'axxs-digital/the-gazette/gc_ad-the-gazette-lingo-thumbnail.webp',
  },
  {
    id: 'design-photography',
    kicker: '04 — Brand & Graphic Design',
    image: 'design-photography/timeout/gc_dp-timeout-thumbnail.webp',
  },
];

// Single-ink SVG thumbnails for the archive promo, in the frame's order.
const PROMO_IDS = [
  {
    id: 'seventh-sense',
    type: 'work' 
  },
  {
    id: 'beehive-design',
    type: 'work' 
  },
  {
    id: 'scarborough-charter',
    type: 'work' 
  },
  {
    id: 'visualizing-science',
    type: 'work' 
  },
  {
    id: 'does-this-work',
    type: 'work' 
  },
  {
    id: 'enginuitty-group-ltd',
    type: 'work' 
  }  
];

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? '' : 's'}`;

export default function HomePage() {
  const recordById = ARCHIVE_ITEMS_BY_ID;

  return (
    <div className="flex flex-col pt-14 lg:pt-16">
      {/* Portrait intro */}
      {/* 1024+: label in row 1, aside in row 2 directly under it, the h1 block spanning both rows.
          Row 2 is 1fr so the spanning h1 block's height goes only to row 2 and row 1 stays the label's height. */}
      <section aria-labelledby="intro" className="grid gap-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-6 lg:gap-y-8">
        <p className="a-label text-lmAccentInk lg:col-span-3 dark:text-dmAccentInk">FIG. 00 — INTRO</p>
        <div className="flex flex-col gap-8 lg:col-span-9 lg:col-start-4 lg:row-span-2 lg:row-start-1">
          <h1 id="intro" className={DISPLAY_HEADING}>
            I design the brand, the interface, and increasingly the <span className="text-lmAccentInk dark:text-dmAccentInk">code</span> behind&nbsp;them.
          </h1>
          <p className="font-text text-subtitle font-medium text-lmSecondary max-w-160 dark:text-dmSecondary">
            I’m a graphic designer transitioning into product design engineering, trained at OCAD University and drawn to work at the frontier of science and technology.
          </p>
        </div>
        {/* <640 stacked · 640–1023 labels and portrait side by side · 1024+ the 3-column aside under the label */}
        <aside className="grid gap-6 sm:grid-cols-2 sm:items-end lg:col-span-3 lg:col-start-1 lg:row-start-2 lg:-mt-2 lg:grid-cols-1 lg:items-start lg:self-start">
          <ul className="a-label flex flex-col text-lmSecondary dark:text-dmSecondary">
            <li className="border-t border-lmMedium py-2.5 dark:border-dmMedium">Designer &amp; aspiring<br />software engineer</li>
            <li className="border-t border-lmMedium py-2.5 dark:border-dmMedium">Toronto, Canada</li>
            <li className="border-y border-lmMedium py-2.5 dark:border-dmMedium">OCAD University<br />BDes Graphic Design</li>
          </ul>
          <figure className="flex w-full flex-col gap-2">
            <Image
              src={mediaURL('landing-page/gc_profile-pic.webp', 'image')}
              alt="Portrait of Gian-I Cambridge"
              width={1400}
              height={1400}
              loading="eager"
              fetchPriority="high"
              className="aspect-square h-auto w-full bg-lmSurface object-cover dark:bg-dmSurface"
            />
            <figcaption className="a-label text-lmFadedText dark:text-dmFadedText">FIG. 01 — PORTRAIT</figcaption>
          </figure>
        </aside>
      </section>

      {/* Three disciplines */}
      {/* <640 ruled list · 640–1023 ruled rows (no. · name · text) · 1024+ 3-up */}
      <section aria-label="Disciplines" className="mt-16 grid lg:mt-18 lg:grid-cols-3 lg:gap-x-6">
        {DISCIPLINES.map((discipline, i) => (
          <div
            key={discipline.title}
            className="grid gap-2 border-t border-lmPrimary py-4 sm:grid-cols-12 sm:gap-x-6 lg:flex lg:flex-col lg:gap-2 lg:pr-6 lg:pb-0 dark:border-dmPrimary"
          >
            <span className="a-label pt-1.5 text-lmFadedText sm:col-span-1 lg:pt-0 dark:text-dmFadedText">{String(i + 1).padStart(2, '0')}</span>
            <h2 className="font-text text-subtitle font-medium text-lmPrimary sm:col-span-5 dark:text-dmPrimary">{discipline.title}</h2>
            <p className="text-small text-lmSecondary sm:col-span-6 dark:text-dmSecondary">{discipline.detail}</p>
          </div>
        ))}
      </section>

      {/* Selected works */}
      <section aria-labelledby="selected-works" className="mt-24 flex flex-col gap-8 sm:mt-32">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-lmPrimary pb-3 dark:border-dmPrimary">
          <h2 id="selected-works" className={TITLE_HEADING}>
            Selected works
          </h2>
          <span className="a-label text-lmFadedText dark:text-dmFadedText">
            {String(FEATURED.length).padStart(2, '0')} of {WORK_COUNT} works ·{' '}
            <Link href="/archive" className="text-lmPrimary underline decoration-lmFadedText underline-offset-4 hover:text-lmAccentInk dark:text-dmPrimary dark:hover:text-dmAccentInk">
              Browse the archive →
            </Link>
          </span>
        </div>
        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED.map((work) => {
            const record = recordById.get(work.id);
            if (!record) return null;
            return (
              <li key={work.id}>
                <article className="group flex flex-col gap-4">
                  <Link href={`/archive/works/${work.id}`} aria-label={record.title} className="block">
                    <span className="block aspect-square w-full bg-lmSurface transition-shadow duration-(--duration-hover) ease-snap group-hover:shadow-lmRaised dark:bg-dmSurface dark:group-hover:shadow-dmRaised">
                      <Image src={mediaURL(work.image, 'image')} alt="" width={480} height={480} className="h-full w-full object-cover" />
                    </span>
                  </Link>
                  <div className="flex flex-col gap-2">
                    <div className="a-label flex flex-wrap justify-between gap-2">
                      <span className="text-lmAccentInk dark:text-dmAccentInk">{work.kicker}</span>
                      <span className="text-lmFadedText dark:text-dmFadedText">{formatArchiveDate(record.date)}</span>
                    </div>
                    <h3 className="font-text text-[1.5rem] leading-7 font-semibold text-lmPrimary group-hover:text-lmAccentInk dark:text-dmPrimary dark:group-hover:text-dmAccentInk">
                      {record.title}
                    </h3>
                    <p className="text-small text-lmSecondary dark:text-dmSecondary">{META_DESCRIPTION.get(work.id)}</p>
                    <Link
                      href={`/archive/works/${work.id}`}
                      className="a-button mt-2 w-fit text-lmPrimary underline decoration-lmFadedText underline-offset-4 hover:text-lmAccentInk dark:text-dmPrimary dark:hover:text-dmAccentInk"
                    >
                      View {record.title} →
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Archive promo */}
      <section aria-labelledby="archive-promo" className="mt-24 grid gap-10 border-t border-lmPrimary pt-8 sm:mt-32 lg:grid-cols-12 lg:gap-x-6 dark:border-dmPrimary">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <span className="a-label text-lmAccentInk dark:text-dmAccentInk">FIG. 02 — INDEX</span>
          <h2 id="archive-promo" className={TITLE_HEADING}>
            The archive
          </h2>
          <p className="text-body text-lmSecondary max-w-160 dark:text-dmSecondary">
            {plural(WORK_COUNT, 'work')} and {plural(NOTE_COUNT, 'note')} in one place: client projects, personal experiments and the thinking behind them. Filter by medium, tool or keyword.
          </p>
          <Link href="/archive" className={`${BUTTON_PRIMARY} w-fit`}>
            Browse the archive
          </Link>
        </div>
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6 lg:col-span-7" aria-hidden="true">
          {PROMO_IDS.map((item) => {
            const record = recordById.get(item.id);
            if (!record) return null;
            const Thumbnail = record.thumbnail;
            return (
              <li key={item.id} className="group grid aspect-square place-items-center bg-lmSurface dark:bg-dmSurface p-0">
                <Link
                  className="flex flex-row justify-center items-center h-full w-full"
                  href={`/archive/${item.type}s/${item.id}`}
                >
                  <Thumbnail focusable="false" className="size-[84%] text-lmSecondary group-hover:text-lmAccentInk dark:text-dmSecondary transition-colors duration-(--duration-hover)" />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
