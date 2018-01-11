import React from 'react';

class RandomInt extends React.Component {
  state = {
    num: this.props.origin
  };

  static defaultProps = {
    interval: 3,
    origin: 0,
    delay: 0
  };

  componentDidMount() {
    this.timer = setTimeout(
      this.tick,
      (this.props.delay + this.props.interval) * 1000
    );
  }

  tick = () => {
    this.change();
    this.timer = setTimeout(this.tick, this.props.interval * 1000);
  };

  change = () => {
    let num = -1;
    do {
      num = Math.floor(Math.random() * this.props.max);
    } while (num === this.state.num);
    this.setState({ num });
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return this.props.render(this.state.num);
  }
}

export default RandomInt;
