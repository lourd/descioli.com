import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import sizes from 'style/sizes';
import Link from 'gatsby-link';
import BodyClass from 'lib/components/BodyClass';
import HamburgerToggle from 'lib/components/HamburgerToggle';
import { shadows } from 'style/snippets';
import Ripple from 'react-ink';
import color from 'color';

const bgColor = 'red';

injectGlobal`
  .noScroll {
    overflow: hidden;
  }
`;

const Button = styled.button`
  background-color: ${bgColor};
  position: fixed;
  border-radius: 50%;
  bottom: 20px;
  right: 20px;
  height: 50px;
  width: 50px;
  z-index: 3;
  border: none;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  user-select: none;
  outline: none;
  @media (min-width: ${sizes.medium}) {
    top: 20px;
    bottom: inherit;
    height: 70px;
    width: 70px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => shadows({ startingElevation: props.isOpen ? 0 : 1 })};
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

const ExtMenuLink = styled.a`
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
    &:hover {
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

const IntMenuLink = ExtMenuLink.withComponent(Link);

const MenuLink = props => {
  if (props.url) {
    return (
      <ExtMenuLink i={props.i} bgColor={props.color} href={props.url}>
        {props.copy}
      </ExtMenuLink>
    );
  }
  return (
    <IntMenuLink
      to={props.path}
      i={props.i}
      bgColor={props.color}
      onClick={props.onClick}
    >
      {props.copy}
    </IntMenuLink>
  );
};

const Menu = props => (
  <MenuContainer
    isOpen={props.open}
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
