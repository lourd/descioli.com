import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import Link from 'gatsby-link';
import Ripple from 'react-ink';
import color from 'color';
import sizes from 'style/sizes';
import BodyClass from 'lib/components/BodyClass';
import HamburgerToggle from 'lib/components/HamburgerToggle';
import { shadows } from 'style/snippets';
import { fadeIn } from 'style/animations';

injectGlobal`
  .noScroll {
    overflow: hidden;
  }
`;

const Button = styled.button`
  position: fixed;
  border-radius: 50%;
  bottom: 20px;
  right: 20px;
  height: 70px;
  width: 70px;
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
  background-color: rgba(0, 0, 0, ${props => (props.isOpen ? 0 : 0.4)});
  ${props => shadows({ startingElevation: props.isOpen ? 0 : 1 })};
  transition: box-shadow 250ms, transform 250ms, background-color 250ms;
  @media (min-width: ${sizes.medium}) {
    bottom: 40px;
    right: 40px;
    transform: scale(1.3);
  }
  @media (min-width: ${sizes.large}) {
    top: 48px;
    right: 5%;
    bottom: inherit;
    transform: ${props =>
      props.isOpen ? `scale(1.5) translateY(-24px)` : 'scale(1.2)'};
  }
  @media print {
    display: none;
  }
`;

const Toggle = props => (
  <Button onClick={props.onClick} isOpen={props.isOpen}>
    <HamburgerToggle isOpen={props.isOpen} />
    <Ripple />
  </Button>
);

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
  background-color: ${props => props.color};
`;

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
    background-color: ${props => props.bgColor};
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
`;

const StyledIntMenuLink = StyledMenuLink.withComponent(Link);

const MenuLink = props => {
  if (props.url) {
    return (
      <StyledMenuLink i={props.i} bgColor={props.color} href={props.url}>
        {props.copy}
      </StyledMenuLink>
    );
  }
  return (
    <StyledIntMenuLink
      to={props.path}
      i={props.i}
      bgColor={props.color}
      onClick={props.onClick}
    >
      {props.copy}
    </StyledIntMenuLink>
  );
};

const Menu = props => (
  <MenuContainer
    isOpen={props.open}
    aria-hidden={!props.open}
    color={props.links[props.links.length - 1].color}
  >
    {props.links.map((link, i) => (
      <MenuLink key={i} i={i} onClick={props.onClick} {...link} />
    ))}
  </MenuContainer>
);

export default class Nav extends React.Component {
  state = {
    open: false
  };

  toggle = () => this.setState(state => ({ open: !state.open }));

  render() {
    return (
      <span>
        <Toggle onClick={this.toggle} isOpen={this.state.open} />
        <Menu
          open={this.state.open}
          links={this.props.links}
          onClick={this.toggle}
        />
        {this.state.open && <BodyClass className="noScroll" />}
      </span>
    );
  }
}
