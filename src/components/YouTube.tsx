import React from 'react';
import ResponsiveParent from './ResponsiveParent';

export default function YouTube({ videoId }) {
  const opts = { width: 400, height: 225 };
  return (
    <ResponsiveParent height={opts.height} width={opts.width} className="yt">
      <iframe
        src={`//www.youtube.com/embed/${videoId}`}
        width="100%"
        height="100%"
      />
    </ResponsiveParent>
  );
}
