import React, { Component } from 'react'

import OnMouseMove from 'lib/components/OnMouseMove'
import { fade } from 'style/animations'
import { stretchFull } from 'style/snippets'
import styled from 'styled-components'
import BodyClass from 'lib/components/BodyClass'

const ImgBackground = styled.div.attrs({
  style: props => ({
    transform: `translate3d(${props.dX}, ${props.dY}, 0) scale(1.1)`,
  }),
})`
  ${stretchFull};
  background-size: cover;
  background-image: url(${props => props.img});
  background-position: 75% center;
  z-index: -1;
  position: fixed;
  &:after {
    content: '';
    z-index: 1;
    ${stretchFull};
    background-color: ${props => props.theme.black};
    animation: ${fade({ from: 1, to: 0.25 })} forwards 1.2s;
    animation-delay ${props => props.delay}s;
  }
`

const MovingImgBackground = props => (
  <OnMouseMove
    render={({ x, y }) => {
      let xDist = 0
      let yDist = 0
      if (typeof window !== 'undefined') {
        const xd = x / window.innerWidth
        const yd = y / window.innerHeight
        ;[xDist, yDist] = [xd, yd].map(delta => 2.5 - delta * 5)
      }
      return (
        <ImgBackground
          dX={`${xDist}%`}
          dY={`${yDist}%`}
          img={props.img}
          delay={props.delay}
        >
          {/* Firefox scroll bug workaround */}
          <BodyClass className="noScroll" />
        </ImgBackground>
      )
    }}
  />
)

export default MovingImgBackground
