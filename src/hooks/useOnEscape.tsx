import useOnKeyDown from 'hooks/useOnKeyDown';

interface Props {
  handler: (evt: KeyboardEvent) => void;
}

export function useOnEscape(props: Props) {
  useOnKeyDown({ keyCode: 27, handler: props.handler });
}

export function OnEscape(props: Props) {
  useOnEscape(props);
  return null;
}
