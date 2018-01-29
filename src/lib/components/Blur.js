import React from 'react'
import styled from 'styled-components'

const Blur = styled.div`
  transition: filter
    ${props => (props.blurred ? props.transitionIn : props.transitionOut)}s;
  filter: ${props => (props.blurred ? `blur(${props.blur}px)` : null)};
  will-change: filter;
`

Blur.defaultProps = {
  blur: 10,
  transitionIn: 0.5,
  transitionOut: 0.25,
}

export default Blur
