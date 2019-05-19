import React, { useRef, useCallback, MouseEvent } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import Ripple from 'react-ink';
import color from 'color';
import sizes from 'style/sizes';
import BodyClass from 'components/BodyClass';
import HamburgerToggle from 'components/HamburgerToggle';
import { shadows } from 'style/snippets';
import { fadeIn } from 'style/animations';
import { OnEscape } from 'hooks/useOnEscape';

type TLink = {
  path: string;
  copy: string;
  color: string;
};

interface Openable {
  open: boolean;
}

interface ToggleProps extends Openable {
  onClick: () => void;
}

interface MenuProps extends ToggleProps {
  links: TLink[];
}

interface NavProps extends Openable {
  links: TLink[];
  toggle: () => void;
}

const Button = styled.button<Openable>`
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
  ${props => shadows({ startingElevation: props.open ? 0 : 2 })};
  transition: box-shadow 250ms, transform 250ms, background-color 250ms;
  &:focus {
    background-color: ${props =>
      props.open ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.8)'};
  }
  @media (min-width: ${sizes.medium}) {
    bottom: 24px;
    right: 24px;
    transform: scale(1.3);
  }
  @media (min-width: ${sizes.large}) {
    background-color: ${props =>
      props.open ? 'transparent' : 'rgba(0,0,0,0.5)'};
    &:focus {
      background-color: ${props =>
        props.open ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.8)'};
    }
    top: 52px;
    right: 5%;
    bottom: inherit;
    transform: ${props =>
      props.open ? `scale(1.5) translateY(-24px)` : 'scale(1.2)'};
  }
  @media print {
    display: none;
  }
`;

const Toggle = (props: ToggleProps) => (
  <Button
    onClick={props.onClick}
    open={props.open}
    aria-label="Navigation menu toggle"
  >
    <HamburgerToggle isOpen={props.open} />
    <Ripple />
  </Button>
);

const MenuContainer = styled.nav<Openable>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  opacity: ${props => (props.open ? 1 : 0)};
  transition: opacity 300ms;
  pointer-events: ${props => (props.open ? 'inherit' : 'none')};
`;

const StyledA = styled.a`
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
`;

const StyledLink = StyledA.withComponent(Link);

interface MenuLinkProps {
  onClick: () => void;
  tabIndex: number | null;
  color: string;
  url?: string;
  path?: string;
  copy: string;
}

const MenuLink = (props: MenuLinkProps) => {
  const colorCss = css`
    background-color: ${color(props.color)
      .alpha(0.7)
      .string()};
    &:hover,
    &:focus {
      background-color: ${color(props.color)
        .darken(0.15)
        .string()};
    }
    &:active {
      background-color: ${color(props.color)
        .darken(0.3)
        .string()};
    }
  `;
  if (props.url) {
    return (
      <StyledA tabIndex={props.tabIndex} href={props.url} css={colorCss}>
        {props.copy}
      </StyledA>
    );
  }
  return (
    <StyledLink
      tabIndex={props.tabIndex}
      to={props.path}
      onClick={props.onClick}
      css={colorCss}
    >
      {props.copy}
    </StyledLink>
  );
};

function Menu(props: MenuProps) {
  const container = useRef<HTMLElement>(null);
  const handleMenuClick = useCallback(
    (event: MouseEvent) => {
      if (event.target === container.current) {
        props.onClick();
      }
    },
    [props.onClick]
  );
  return (
    <MenuContainer
      ref={container}
      open={props.open}
      aria-hidden={!props.open}
      color={props.links[props.links.length - 1].color}
      onClick={handleMenuClick}
    >
      {props.links.map((link, i) => (
        <MenuLink
          key={i}
          onClick={props.onClick}
          tabIndex={props.open ? null : -1}
          {...link}
        />
      ))}
    </MenuContainer>
  );
}

export default function Nav(props: NavProps) {
  return (
    <span>
      <Toggle onClick={props.toggle} open={props.open} />
      <Menu open={props.open} links={props.links} onClick={props.toggle} />
      {props.open && <BodyClass className="noScroll" />}
      {props.open && <OnEscape handler={props.toggle} />}
    </span>
  );
}
