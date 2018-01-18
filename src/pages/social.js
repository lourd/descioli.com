import React from 'react';
import styled from 'styled-components';
import { elevate } from 'style/snippets';
import sizes from 'style/sizes';

const SocialContainer = styled.a`
  color: ${props => props.color};
  background: ${props => props.bg};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  min-width: 300px;
  min-height: 180px;
  flex: 1 1;
  text-decoration: none;
  transition: box-shadow 200ms;
  @media (min-width: ${sizes.medium}) {
    min-height: 250px;
  }
  &:hover,
  &:focus {
    text-decoration: underline;
    z-index: 1;
    ${elevate(2)};
  }
  &:active {
    ${elevate(3)};
  }
`;

const Description = styled.span`
  font-weight: 300;
  font-size: 1.5em;
`;

const SocialSquare = props => (
  <SocialContainer
    href={props.link}
    bg={props.bg}
    color={props.color}
    title={props.name}
  >
    <Description>{props.description}</Description>
  </SocialContainer>
);

const Page = styled.main`
  display: flex;
  flex-flow: row wrap;
  min-height: 100vh;
`;

const SocialPage = props => (
  <Page>
    {props.data.allInternetsYaml.edges.map(edge => (
      <SocialSquare {...edge.node} />
    ))}
  </Page>
);

export default SocialPage;

export const pageQuery = graphql`
  query SocialQuery {
    allInternetsYaml {
      edges {
        node {
          name
          link
          description
          color
          bg
        }
      }
    }
  }
`;
