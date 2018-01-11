import React from 'react';
import styled from 'styled-components';
import { fadeDownInCss } from 'style/snippets';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { fadeInFrom, fadeOutTo } from 'style/animations';

const BylinesContainer = styled.h2`
  ${fadeDownInCss};
  font-size: 2.2em;
  font-weight: 300;
  letter-spacing: -1px;
  animation-delay: ${props => props.delay}s;
  transition: transform 500ms;
  position: relative;
  height: 50px;
`;

const inAnim = fadeInFrom({ x: 15, y: -25 });
const outAnim = fadeOutTo({ x: 5, y: 20 });

const Byline = styled.span`
  position: absolute;
  top: 0;
  max-width: 85vw;
  &.anim-enter-active {
    animation: ${inAnim} 0.8s forwards;
  }
  &.anim-exit-active {
    animation: ${outAnim} 0.6s forwards;
  }
`;

class Bylines extends React.Component {
  state = {
    index: 0
  };

  static defaultProps = {
    interval: 3
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
    let index = -1;
    do {
      index = Math.floor(Math.random() * (this.props.bylines.length - 1));
    } while (index === this.state.index);
    this.setState({ index });
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <BylinesContainer
        delay={this.props.delay}
        title="Things that I am or have been"
      >
        <TransitionGroup>
          <CSSTransition
            key={this.state.index}
            timeout={1000}
            classNames="anim"
          >
            <Byline>{this.props.bylines[this.state.index].text}</Byline>
          </CSSTransition>
        </TransitionGroup>
      </BylinesContainer>
    );
  }
}

export default Bylines;
