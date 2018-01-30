import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import Ripple from 'react-ink'
import color from 'color'
import sizes from 'style/sizes'
import BodyClass from 'lib/components/BodyClass'
import HamburgerToggle from 'lib/components/HamburgerToggle'
import { shadows } from 'style/snippets'
import { fadeIn } from 'style/animations'
import OnEscape from 'lib/components/OnEscape'

const Button = styled.button`
  position: fixed;
  border-radius: 50%;
  bottom: 16px;
  right: 16px;
  height: 56px;
  width: 56px;
  z-index: 3;
  border: none;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  user-select: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: ${fadeIn} 1.2s forwards;
  animation-delay: 3s;
  background-color: rgba(0, 0, 0, 0.5);
  ${props => shadows({ startingElevation: props.isOpen ? 0 : 2 })};
  transition: box-shadow 250ms, transform 250ms, background-color 250ms;
  &:focus {
    background-color: ${props =>
      props.isOpen ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.8)'};
  }
  @media (min-width: ${sizes.medium}) {
    bottom: 24px;
    right: 24px;
    transform: scale(1.3);
  }
  @media (min-width: ${sizes.large}) {
    background-color: ${props =>
      props.isOpen ? 'transparent' : 'rgba(0,0,0,0.5)'};
    &:focus {
      background-color: ${props =>
        props.isOpen ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.8)'};
    }
    top: 52px;
    right: 5%;
    bottom: inherit;
    transform: ${props =>
      props.isOpen ? `scale(1.5) translateY(-24px)` : 'scale(1.2)'};
  }
  @media print {
    display: none;
  }
`

const Toggle = props => (
  <Button onClick={props.onClick} isOpen={props.isOpen}>
    <HamburgerToggle isOpen={props.isOpen} />
    <Ripple />
  </Button>
)

const MenuContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  transition: opacity 300ms;
  pointer-events: ${props => (props.isOpen ? 'inherit' : 'none')};
`

const StyledMenuLink = styled.a`
  display: block;
  color: white;
  font-size: 2em;
  @media (min-width: ${sizes.medium}) {
    font-size: 3em;
  }
  text-decoration: none;
  line-height: 1.1;
  padding: 15px 5%;
  transition: background-color 250ms;
  &:nth-child(${props => props.i + 1}) {
    background-color: ${props =>
      color(props.bgColor)
        .alpha(0.7)
        .string()};
    &:hover,
    &:focus {
      background-color: ${props =>
        color(props.bgColor)
          .darken(0.15)
          .string()};
    }
    &:active {
      background-color: ${props =>
        color(props.bgColor)
          .darken(0.3)
          .string()};
    }
  }
`

const StyledIntMenuLink = StyledMenuLink.withComponent(Link)

const MenuLink = props => {
  if (props.url) {
    return (
      <StyledMenuLink
        i={props.i}
        bgColor={props.color}
        href={props.url}
        tabIndex={props.tabIndex}
      >
        {props.copy}
      </StyledMenuLink>
    )
  }
  return (
    <StyledIntMenuLink
      to={props.path}
      i={props.i}
      bgColor={props.color}
      onClick={props.onClick}
      tabIndex={props.tabIndex}
    >
      {props.copy}
    </StyledIntMenuLink>
  )
}

class Menu extends React.Component {
  handleMenuClick = event => {
    if (event.target === this.container) {
      this.props.onClick()
    }
  }

  containerRef = el => (this.container = el)

  render() {
    return (
      <MenuContainer
        innerRef={this.containerRef}
        isOpen={this.props.open}
        aria-hidden={!this.props.open}
        color={this.props.links[this.props.links.length - 1].color}
        onClick={this.handleMenuClick}
      >
        {this.props.links.map((link, i) => (
          <MenuLink
            key={i}
            i={i}
            onClick={this.props.onClick}
            tabIndex={this.props.open ? null : -1}
            {...link}
          />
        ))}
      </MenuContainer>
    )
  }
}

export default class Nav extends React.Component {
  render() {
    return (
      <span>
        <Toggle onClick={this.props.toggle} isOpen={this.props.open} />
        <Menu
          open={this.props.open}
          links={this.props.links}
          onClick={this.props.toggle}
        />
        {this.props.open && <BodyClass className="noScroll" />}
        {this.props.open && <OnEscape handler={this.props.toggle} />}
      </span>
    )
  }
}
