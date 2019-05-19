import React from 'react';

interface ImageProps {
  src: string;
  caption?: string;
  alt?: string;
  linkToOriginal: boolean;
  maxWidth?: number;
}

function Image({
  src,
  caption,
  alt = caption,
  linkToOriginal = true,
  maxWidth = 800,
}: ImageProps) {
  let content = <img src={src} alt={alt} />;
  if (linkToOriginal) {
    content = (
      <a href={src} style={{ display: 'block' }} target="_blank" rel="noopener">
        {content}
      </a>
    );
  }
  if (caption) {
    content = (
      <figure>
        {content}
        <figcaption>{caption}</figcaption>
      </figure>
    );
  }
  return (
    <span
      style={{
        position: 'relative',
        display: 'block',
        maxWidth,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      {content}
    </span>
  );
}

export default Image;
