import { Component } from "react";

interface Props {
  keyCode: number;
  handler?: (evt: KeyboardEvent) => void;
}

/**
 * Component for listening to specific key presses. Used for when you want to
 *   listen to global key presses on the document instead of a specific element.
 *   For specific elements, use the `onKeyDown` event built into each React DOM
 *   component
 */
export default class OnKeyDown extends Component<Props> {
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  }

  handleKeydown = (evt: KeyboardEvent) => {
    if (this.props.handler && evt.keyCode === this.props.keyCode) {
      this.props.handler(evt);
    }
  };

  render() {
    return null;
  }
}
