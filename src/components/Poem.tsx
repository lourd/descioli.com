import React from 'react';

function Poem({ children, title }) {
  return (
    <pre className="quote">
      <br />
      <b>{title}</b>
      <br />
      <br />
      {children}
    </pre>
  );
}

export default Poem;
