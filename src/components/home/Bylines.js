import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import OnInterval from 'lib/components/OnInterval'
import TextCarousel from 'components/TextCarousel'
import { fadeDownInCss } from 'style/snippets'
import Bag from 'lib/Bag'

const BylinesContainer = styled.h2`
  font-size: 2.2em;
  font-weight: 300;
  max-width: 85vw;
  ${fadeDownInCss};
  animation-delay: ${props => props.delay}s;
`

class Bylines extends React.Component {
  state = {
    byline: this.props.bylines[0],
  }

  componentDidMount() {
    this.bag = new Bag(this.props.bylines.length)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.bylines !== this.props.bylines) {
      this.bag.fill(this.props.bylines.length)
    }
  }

  change = () => {
    this.setState({ byline: this.props.bylines[this.bag.grab()] })
  }

  render() {
    return (
      <BylinesContainer
        title="Things that I am or have been"
        delay={this.props.delay}
      >
        <OnInterval
          interval={this.props.interval}
          delay={this.props.delay + this.props.interval}
          tick={this.change}
        >
          <TextCarousel childKey={this.state.byline}>
            {this.state.byline}
          </TextCarousel>
        </OnInterval>
      </BylinesContainer>
    )
  }
}

Bylines.propTypes = {
  bylines: PropTypes.arrayOf(PropTypes.string).isRequired,
  delay: PropTypes.number.isRequired,
  interval: PropTypes.number.isRequired,
}

export default Bylines
