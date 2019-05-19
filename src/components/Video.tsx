import React from 'react';

function Video({ src, caption, maxWidth }) {
  return (
    <figure style={{ maxWidth: `${maxWidth}px` }}>
      <video src={src} controls width="100%" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export default Video;
