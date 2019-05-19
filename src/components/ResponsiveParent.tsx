import React from 'react';
import styled from '@emotion/styled';

const Parent = styled.div<{ ratio: number }>`
  padding-bottom: ${props => props.ratio * 100}%;
  position: relative;
  height: 0;
  margin-bottom: 1.45rem;
`;

const Responsive = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface ResponsiveParentProps {
  height: number;
  width: number;
  children: React.ReactElement;
}

function ResponsiveParent({ height, width, children }: ResponsiveParentProps) {
  return (
    <Parent ratio={height / width}>
      <Responsive>{children}</Responsive>
    </Parent>
  );
}

export default ResponsiveParent;
