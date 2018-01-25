import React from 'react'
import styled from 'styled-components'

const Blur = styled.div`
  transition: filter
    ${props => (props.blurred ? props.transitionIn : props.transitionOut)}s;
  filter: blur(${props => (props.blurred ? props.blur : 0)}px);
`

Blur.defaultProps = {
  blur: 10,
  transitionIn: 0.5,
  transitionOut: 0.25,
}

export default Blur
