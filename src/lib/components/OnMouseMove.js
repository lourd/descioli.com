import React, { Component } from 'react'

class OnMouseMove extends Component {
  state = {
    x: 0,
    y: 0,
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.listener)
  }

  listener = evt => {
    this.setState({
      x: evt.clientX,
      y: evt.clientY,
    })
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.listener)
  }

  render() {
    return this.props.children(this.state)
  }
}

export default OnMouseMove
