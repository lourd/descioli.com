import { Component, ReactNode } from 'react';

interface State {
  x: number;
  y: number;
}

interface Props {
  children: (mouseState: State) => ReactNode;
}

class OnMouseMove extends Component<Props, State> {
  state = {
    x: 0,
    y: 0,
  };

  componentDidMount() {
    document.addEventListener('mousemove', this.listener);
  }

  listener = (evt: MouseEvent) => {
    this.setState({
      x: evt.clientX,
      y: evt.clientY,
    });
  };

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.listener);
  }

  render() {
    return this.props.children(this.state);
  }
}

export default OnMouseMove;
