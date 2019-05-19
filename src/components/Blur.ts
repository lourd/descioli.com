import styled from '@emotion/styled';

interface Props {
  blur: number;
  transitionIn: number;
  transitionOut: number;
  blurred: boolean;
}

const Blur = styled.div<Props>`
  transition: filter
    ${props => (props.blurred ? props.transitionIn : props.transitionOut)}s;
  filter: ${props => (props.blurred ? `blur(${props.blur}px)` : null)};
  will-change: filter;
`;

Blur.defaultProps = {
  blur: 10,
  transitionIn: 0.5,
  transitionOut: 0.25,
};

export default Blur;
