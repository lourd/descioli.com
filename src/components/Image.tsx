import React from 'react';

interface ImageProps {
  src: string;
  caption?: string;
  alt?: string;
  linkToOriginal: boolean;
  maxWidth?: number;
  height: number;
  width: number;
}

function Image({
  src,
  caption,
  alt = caption,
  linkToOriginal = true,
  maxWidth,
  height,
  width,
}: ImageProps) {
  let content = (
    <img src={src} alt={alt} loading="lazy" height={height} width={width} />
  );
  if (linkToOriginal) {
    content = (
      <a href={src} style={{ display: 'block' }} target="_blank" rel="noopener">
        {content}
      </a>
    );
  }
  if (caption) {
    content = (
      <>
        {content}
        <figcaption>{caption}</figcaption>
      </>
    );
  }
  return (
    <figure
      style={{
        maxWidth,
      }}
    >
      {content}
    </figure>
  );
}

export default Image;
