import { useState, useEffect } from 'react';

export default function useMouseCoords() {
  const [state, setState] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const listener = (evt: MouseEvent) => {
      setState({
        x: evt.clientX,
        y: evt.clientY,
      });
    };
    document.addEventListener('mousemove', listener);
    return () => document.removeEventListener('mousemove', listener);
  }, []);
  return state;
}
