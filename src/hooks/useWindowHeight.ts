import { useEffect } from 'react';

/**
 * Sets a CSS variable to the value of the window.innerHeight. Default
 * variable name is --window-height
 */
export default function useWindowHeightToCssVariable(
  variableName = 'window-height'
) {
  useEffect(() => {
    const setAppHeight = () => {
      document.documentElement!.style.setProperty(
        `--${variableName}`,
        `${window.innerHeight}px`
      );
    };
    setAppHeight();
    window.addEventListener('resize', setAppHeight);
    return () => window.removeEventListener('resize', setAppHeight);
  }, [variableName]);
}
