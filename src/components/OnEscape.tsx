import React from "react";
import OnKeyDown from "components/OnKeyDown";

interface Props {
  handler?: (evt: KeyboardEvent) => void;
}

const OnEscape = (props: Props) => (
  <OnKeyDown keyCode={27} handler={props.handler} />
);

export default OnEscape;
