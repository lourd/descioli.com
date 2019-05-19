import { useEffect, useCallback } from "react";

interface Props {
  /** Amount of time in milliseconds until `tick` is called for the first time */
  delay: number;
  /** Amount of time in milliseconds between calls to `tick` */
  interval: number;
  /** The function that will be called repeatedly */
  tick: () => void;
}

export default function useInterval(props: Props) {
  useEffect(() => {
    let i = setTimeout(() => {
      i = setInterval(props.tick, props.interval);
    }, props.delay + props.interval)
    return () => clearTimeout(i);
  }, [props.tick, props.delay])
}
