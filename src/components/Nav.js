import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import sizes from 'style/sizes';
import Link from 'gatsby-link';
import BodyClass from 'lib/components/BodyClass';
import HamburgerToggle from 'lib/components/HamburgerToggle';

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
  @media (min-width: ${sizes.medium}) {
    top: 20px;
    bottom: inherit;
    height: 70px;
    width: 70px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  @media print {
    display: none;
  }
`;

const Toggle = props => (
  <Button onClick={props.onClick}>
    <HamburgerToggle isOpen={props.isOpen} />
  </Button>
);

const MenuContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${bgColor};
  z-index: 2;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  transition: opacity 300ms;
  pointer-events: ${props => (props.isOpen ? 'inherit' : 'none')};
  padding: 0px 5%;
  a {
    display: block;
    color: white;
    font-size: 2em;
    @media (min-width: ${sizes.medium}) {
      font-size: 3em;
    }
    text-decoration: none;
    line-height: 1.1;
    margin: 15px 0px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const MenuLink = props => {
  if (props.url) {
    return <a href={props.url}>{props.copy}</a>;
  }
  return (
    <Link to={props.path} onClick={props.onClick}>
      {props.copy}
    </Link>
  );
};

const Menu = props => (
  <MenuContainer isOpen={props.open}>
    {props.links.map((link, i) => (
      <MenuLink key={i} onClick={props.onClick} {...link} />
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
