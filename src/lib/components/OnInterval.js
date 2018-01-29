import React from 'react'
import PropTypes from 'prop-types'

class OnInterval extends React.Component {
  static propTypes = {
    /** Amount of time in seconds until `tick` is called for the first time */
    delay: PropTypes.number.isRequired,
    /** Amount of time in seconds between calls to `tick` */
    interval: PropTypes.number.isRequired,
    /** The function that will be called repeatedly */
    tick: PropTypes.func.isRequired,
    children: PropTypes.node,
  }

  static defaultProps = {
    delay: 0,
    children: null,
  }

  componentDidMount() {
    this.timer = setTimeout(this.tick, this.props.delay * 1000)
  }

  tick = () => {
    this.props.tick()
    this.timer = setTimeout(this.tick, this.props.interval * 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    return this.props.children
  }
}

export default OnInterval
