import type { Metadata } from 'next';
import Disclosure from '@/components/archive/disclosure';
import SpecSection from '@/components/archive/spec-section';
import RailLayout from '@/components/archive/rail-layout';
import ArchiveNav from '@/components/archive/archive-nav';
import mediaURL from '@/lib/media-url/media-url';
import resumeBlocksJson from '@/data/resume-blocks.json';
import { DISPLAY_HEADING, LABEL_FADED, TEXT_LINK } from '@/lib/ui/classes';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Resume of Gian-I Cambridge: education, work experience, and skills in graphic design, product design, and development.',
};

type ResumeEntry = { name: string; institution: string; date: string; location: string; items: string[] };
type ResumeSection = { title: string; id: string; content: ResumeEntry[] };

const SKILLS = [
  {
    label: 'Proficient in',
    items: [
      { name: 'Adobe Creative Suite', detail: 'After Effects, Animate, Illustrator, InDesign, Photoshop, Premiere.' },
      { name: 'Frontend Web Design & Development', detail: 'Figma, HTML, CSS (+ Tailwind CSS), JavaScript (+ TypeScript, React.js, Next.js; intermediate in Node.js backend, Three.js).' },
      { name: 'Microsoft Office', detail: 'Excel, PowerPoint, Word.' },
    ],
  },
  {
    label: 'Intermediate in',
    items: [
      { name: 'Programming & Scripting', detail: 'Python' },
      { name: 'AI-Assisted Development', detail: 'Claude Design, Claude Code' },
      { name: '2D and 3D Drafting', detail: 'AutoCAD, Rhino 8' },
      { name: '3D Animation', detail: 'Blender' },
      { name: 'Creative Coding', detail: 'Cycling ’74 Max 9, Processing' },
      { name: 'Electronic Prototyping', detail: 'Arduino' },
    ],
  },
];

/** "September 2022 – May 2026" → "Sep 2022 – May 2026" (shown uppercase in mono). */
const shortenMonths = (date: string) =>
  date.replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g, (month) => month.slice(0, 3));

function ResumeEntries({ section }: { section: ResumeSection }) {
  return (
    <div className="flex flex-col">
      {section.content.map((entry, i) => (
        <Disclosure
          key={`${entry.name}-${i}`}
          variant="entry"
          lead={shortenMonths(entry.date)}
          title={
            <>
              {entry.name}
              <span className="mt-0.5 block font-text text-small font-normal font-stretch-100% text-lmSecondary sm:text-base dark:text-dmSecondary">{entry.institution}</span>
            </>
          }
          meta={entry.location}
          headingLevel={3}
        >
          <ul className="flex list-['—'] flex-col gap-2 pl-5 marker:text-lmAccentInk text-small text-lmSecondary dark:text-dmSecondary dark:marker:text-dmAccentInk">
            {entry.items.map((text, j) => (
              <li key={j} className="pl-2">
                {text}
              </li>
            ))}
          </ul>
        </Disclosure>
      ))}
    </div>
  );
}

export default function ResumePage() {
  const education = resumeBlocksJson.education as ResumeSection;
  const work = resumeBlocksJson.workExperience as ResumeSection;

  return (
    <RailLayout nav={<ArchiveNav />}>
      <div className="flex flex-col gap-10">
        <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <h1 className={DISPLAY_HEADING}>Resume</h1>
          <div className="flex flex-col gap-2 sm:items-end">
            <p className={LABEL_FADED}>Gian-I Cambridge</p>
            <a href={mediaURL('resume/gc_resume-nov-2026-digital-3.pdf', 'pdf', true)} download={true} className={`a-label ${TEXT_LINK}`}>
              Download the PDF version ↓
            </a>
          </div>
        </header>

        <div>
          <SpecSection id="objective" index={1} title="Objective">
            <p className="font-text text-subtitle font-medium text-lmPrimary dark:text-dmPrimary">
              Designer and aspiring software engineer, carrying a graphic design practice into websites, interfaces, and interactive systems. Translates complex concepts into clear, human-centered visual systems and software, enhancing everyday interactions and improving understanding of science and technology.
            </p>
          </SpecSection>

          <SpecSection id="education" index={2} title={education.title}>
            <ResumeEntries section={education} />
          </SpecSection>

          <SpecSection id="work" index={3} title={work.title}>
            <ResumeEntries section={work} />
          </SpecSection>

          <SpecSection id="skills" index={4} title="Skills and abilities">
            <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-6">
              {SKILLS.map((group) => (
                <div key={group.label} className="flex flex-col">
                  <span className={`${LABEL_FADED} border-b border-lmPrimary pb-2 dark:border-dmPrimary`}>{group.label}</span>
                  <dl className="flex flex-col">
                    {group.items.map((item) => (
                      <div key={item.name} className="grid gap-1 border-b border-lmMedium py-3 dark:border-dmMedium">
                        <dt className="font-text text-body font-semibold text-lmPrimary dark:text-dmPrimary">{item.name}</dt>
                        <dd className="text-small text-lmSecondary dark:text-dmSecondary">{item.detail}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-2">
              <span className={LABEL_FADED}>Additionally</span>
              <p className="text-body text-lmSecondary dark:text-dmSecondary">Canadian Citizen, U.S. Citizen, &amp; Eligible to Work.</p>
            </div>
          </SpecSection>
        </div>
      </div>
    </RailLayout>
  );
}
