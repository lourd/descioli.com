import React from 'react';
import styled from '@emotion/styled';

interface BarProps {
  length: number;
  thickness: number;
  isOpen: boolean;
  deltaX: number;
  deltaY: number;
  topYOpen: number;
  topY: number;
  bottomYOpen: number;
  bottomY: number;
}

interface ToggleProps {
  isOpen: boolean;
  barGap: number;
  length: number;
  thickness: number;
}

const Bar = styled.span<BarProps>`
  position: absolute;
  width: ${props => props.length}px;
  background-color: white;
  height: ${props => props.thickness}px;
  border-radius: 5px;
  transition: transform 250ms, opacity 250ms;
  will-change: transform, opacity;
`;

const BarOne = styled(Bar)`
  transform-origin: top left;
  transform: ${props =>
    props.isOpen
      ? `translate3d(${props.deltaX}px, ${props.topYOpen}px, 0px) rotate(45deg)`
      : `translate3d(0px, ${props.topY}px, 0px)`};
`;

const BarTwo = styled(Bar)`
  opacity: ${props => (props.isOpen ? 0 : 1)};
  transform: ${props =>
    props.isOpen
      ? `translate3d(0px, 0px, -30px) scale(0.7)`
      : `translate3d(0px, 0px, 0px) scale(1)`};
`;

const BarThree = styled(Bar)`
  transform-origin: bottom right;
  transform: ${props =>
    props.isOpen
      ? `translate3d(${-props.deltaX}px, ${
          props.bottomYOpen
        }px, 0px) rotate(-45deg)`
      : `translate3d(0px, ${props.bottomY}px, 0px)`};
`;

const HamburgerContainer = styled.span`
  position: relative;
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HamburgerToggle = (props: ToggleProps) => {
  const topY = -props.barGap;
  const bottomY = props.barGap;

  // Trigonometry, yo.
  const sqrt2over4 = 0.354;
  const deltaX = props.length * (0.5 - sqrt2over4);
  const deltaY = props.barGap - sqrt2over4 * props.length;

  const topYOpen = topY + deltaY;
  const bottomYOpen = -bottomY + deltaY;
  const toggleProps = {
    topY,
    bottomY,
    deltaX,
    deltaY,
    topYOpen,
    bottomYOpen,
    length: props.length,
    barGap: props.barGap,
    thickness: props.thickness,
    isOpen: props.isOpen,
  };
  return (
    <HamburgerContainer>
      <BarOne {...toggleProps} />
      <BarTwo {...toggleProps} />
      <BarThree {...toggleProps} />
    </HamburgerContainer>
  );
};

HamburgerToggle.defaultProps = {
  length: 24,
  barGap: 8,
  thickness: 3,
};

export default HamburgerToggle;
