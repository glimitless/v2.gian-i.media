import ImageContainer from './media/image-container';
import PDFViewer from './media/pdf-viewer';
import YoutubeEmbed from './media/youtube-embed';
import Image from 'next/image';
import mediaURL from '../media-url/media-url';
import { type ReactNode, Fragment } from 'react';
import type { ContentBlockArgs, MediaPartArgs, TextPartArgs } from '@/types/content-body';
import { TEXT_LINK } from '@/lib/ui/classes';

const FIGURE_FRAME = 'border border-lmMedium dark:border-dmMedium';

/**
 * Renders the ContentBlockArgs[][] contract. A group that holds media or a PDF is a figure:
 * the frame, then a mono FIG. nn label and its caption, closed by a hairline.
 * Any other group is running text.
 */
export default function renderContentBody(contentBody: ContentBlockArgs[][]) {
  let figureNumber = 0;
  return (
    <>
      {contentBody.map((contentBlocks, i) => {
        const isFigure = contentBlocks.some((block) => block.type === 'media' || block.type === 'pdf');
        if (isFigure) {
          figureNumber += 1;
          const media = contentBlocks.filter((block) => block.type === 'media' || block.type === 'pdf');
          const rest = contentBlocks.filter((block) => block.type !== 'media' && block.type !== 'pdf');
          return (
            <figure key={i} className="flex flex-col gap-3 border-b border-lmMedium pb-8 dark:border-dmMedium">
              <div className="flex flex-col gap-3">
                {media.map((block, j) => renderContentBlock(block, j))}
              </div>
              <figcaption className="flex flex-col gap-2">
                <span className="a-label text-lmFadedText dark:text-dmFadedText">FIG. {String(figureNumber).padStart(2, '0')}</span>
                {rest.map((block, j) => renderContentBlock(block, j))}
              </figcaption>
            </figure>
          );
        }
        return (
          <div key={i} className="flex flex-col gap-4">
            {contentBlocks.map((block, j) => renderContentBlock(block, j))}
          </div>
        );
      })}
    </>
  );
}

function renderContentBlock(block: ContentBlockArgs, key: number): ReactNode {
  if (block.type === 'media') {
    return (
      <div key={key} className="flex flex-col gap-3">
        {block.content.map((mBlock, j) => renderMediaPart(mBlock, j))}
      </div>
    );
  }
  if (block.type === 'pdf') {
    return <PDFViewer key={key} pages={block.pages} />;
  }
  if (block.type === 'paragraph') {
    return (
      <p key={key} className="text-body text-lmSecondary dark:text-dmSecondary max-w-[66ch]">
        {renderTextParts(block.content, key)}
      </p>
    );
  }
  if (block.type === 'caption') {
    return (
      <p key={key} className="text-small text-lmSecondary dark:text-dmSecondary max-w-[56ch]">
        {renderTextParts(block.content, key)}
      </p>
    );
  }
  if (block.type === 'subtitle-two') {
    return (
      <h2 key={key} className="font-text text-subtitle font-stretch-100% text-lmPrimary dark:text-dmPrimary mt-4">
        {renderTextParts(block.content, key)}
      </h2>
    );
  }
  if (block.type === 'quote') {
    return (
      <blockquote key={key} className="flex flex-col gap-4 border-t border-lmPrimary py-6 dark:border-dmPrimary">
        <span aria-hidden="true" className="font-text text-[3rem] leading-none text-lmAccentInk dark:text-dmAccentInk">“</span>
        {block.content.map((qBlock, i) => renderContentBlock(qBlock, i))}
      </blockquote>
    );
  }
  if (block.type === 'quote-content') {
    return (
      <div key={key} className="flex flex-col gap-4 text-subtitle leading-8 text-lmPrimary dark:text-dmPrimary">
        {block.content.map((inner, k) => renderContentBlock(inner, k))}
      </div>
    );
  }
  if (block.type === 'quote-source') {
    return (
      <footer key={key} className="a-label text-lmFadedText dark:text-dmFadedText border-b border-lmMedium pb-6 dark:border-dmMedium">
        {renderTextParts(block.content, key)}
      </footer>
    );
  }
  if (block.type === 'bullet-item' || block.type === 'numbered-list-item') {
    return <Fragment key={key}>{block.content.map((inner, k) => renderContentBlock(inner, k))}</Fragment>;
  }
  if (block.type === 'bullet-list') {
    return (
      <ul key={key} className="flex list-['–'] flex-col gap-2 pl-6 marker:text-lmAccentInk text-body text-lmSecondary dark:text-dmSecondary dark:marker:text-dmAccentInk">
        {block.content.map((item, j) => (
          <li key={j} className="pl-1">
            {item.content.map((inner, k) => renderContentBlock(inner, k))}
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === 'numbered-list') {
    return (
      <ol key={key} className="flex list-decimal flex-col gap-4 pl-8 marker:font-mono marker:text-lmAccentInk text-body text-lmSecondary dark:text-dmSecondary dark:marker:text-dmAccentInk">
        {block.content.map((item, j) => (
          <li key={j} className="pl-1">
            {item.content.map((inner, k) => renderContentBlock(inner, k))}
          </li>
        ))}
      </ol>
    );
  }
  return null;
}

function renderTextParts(parts: TextPartArgs[], key: number): ReactNode {
  return <>{parts.map((textPart, partIndex) => renderTextPart(textPart, `${key} - ${partIndex}`))}</>;
}

function renderMediaPart(part: MediaPartArgs, key: number) {
  if (part.type === 'image') {
    const imgSrc = mediaURL(part.src, 'image');
    return (
      <ImageContainer key={key} aspect={part.aspect} src={imgSrc} alt={part.alt} width={part.width} height={part.height}>
        <Image className="h-auto w-full max-h-full max-w-full" src={imgSrc} alt={part.alt} width={0} height={0} />
      </ImageContainer>
    );
  }

  if (part.type === 'video') {
    return (
      <div key={key} style={{ aspectRatio: part.aspect }} className={`${FIGURE_FRAME} flex w-full flex-col bg-lmSurface leading-none dark:bg-dmSurface`}>
        <video
          className="h-auto w-full"
          src={`/video/${part.src}`}
          poster={`/posters/${part.poster}`}
          controls={part.controls}
          loop={part.loop}
          muted={part.muted}
          autoPlay={false}
          playsInline
          preload="metadata"
        />
      </div>
    );
  }

  if (part.type === 'youtube-embed') {
    return <YoutubeEmbed key={key} videoId={part.videoId} title={part.title} aspect={part.aspect} />;
  }
  return null;
}

function renderTextPart(part: TextPartArgs, key: number | string): ReactNode {
  if (part.type === 'text') {
    return <Fragment key={key}>{part.value}</Fragment>;
  }
  if (part.type === 'external-link') {
    return (
      <a key={key} href={part.href} target="_blank" rel="noopener noreferrer" className={TEXT_LINK}>
        {part.label} <span aria-hidden="true">↗</span>
      </a>
    );
  }
  if (part.type === 'download-link') {
    return (
      <a key={key} href={mediaURL(part.href, part.mediaType, true)} download={true} className={TEXT_LINK}>
        {part.label} <span aria-hidden="true">↓</span>
      </a>
    );
  }
  return null;
}
