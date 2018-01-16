import React from 'react';
import PropTypes from 'prop-types';
import OnInterval from 'lib/components/OnInterval';

class RandomInt extends React.Component {
  static defaultProps = {
    delay: 0,
    origin: 0
  };

  static propTypes = {
    interval: PropTypes.number.isRequired,
    delay: PropTypes.number.isRequired,
    origin: PropTypes.number.isRequired,
    render: PropTypes.func.isRequired,
    max: PropTypes.number.isRequired
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
