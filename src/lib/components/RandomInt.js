import React from 'react';
import OnInterval from 'lib/components/OnInterval';

class RandomInt extends React.Component {
  static defaultProps = {
    interval: 3,
    delay: 0,
    origin: 0
  };

  state = {
    num: this.props.origin
  };

  change = () => {
    let num = -1;
    do {
      num = Math.floor(Math.random() * this.props.max);
    } while (num === this.state.num);
    this.setState({ num });
  };

  render() {
    return (
      <OnInterval
        interval={this.props.interval}
        delay={this.props.delay}
        tick={this.change}
      >
        {this.props.render(this.state.num)}
      </OnInterval>
    );
  }
}

export default RandomInt;
