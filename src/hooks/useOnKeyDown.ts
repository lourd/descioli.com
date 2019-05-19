import { useEffect, useCallback } from 'react';

interface Props {
  keyCode: number;
  handler?: (evt: KeyboardEvent) => void;
}

/**
 * Listens to specific key presses. Used for when you want to listen to global
 * key presses on the document instead of a specific element. For specific
 * elements, use the `onKeyDown` event built into each React DOM component
 */
export default function useOnKeyDown(props: Props) {
  const handleKeydown = useCallback(
    (evt: KeyboardEvent) => {
      if (props.handler && evt.keyCode === props.keyCode) {
        props.handler(evt);
      }
    },
    [props.handler, props.keyCode]
  );
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [handleKeydown]);
}
