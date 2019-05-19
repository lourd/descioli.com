import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { elevate } from 'style/snippets';
import sizes from 'style/sizes';
import Meta from 'components/Meta';

const meta = {
  title: 'Social networks',
  description: 'Where you can find me',
  keywords: [
    'social media',
    'hangouts',
    'email',
    'twitter',
    'linkedin',
    'facebook',
    'contact',
    'snapchat',
    'github',
    'instagram',
  ],
};

const SocialContainer = styled.a<{ color: string; bg: string }>`
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
  filter: grayscale(80%);
  transition: box-shadow, filter;
  transition-duration: 1.6s, 1.6s;
  transition-timing-function: ease-in-out, ease-in-out;
  @media (min-width: ${sizes.medium}) {
    min-height: 250px;
  }
  margin: 3px;
  &:hover,
  &:focus {
    transition-duration: 0.5s, 0.2s;
    transition-timing-function: ease-in-out, ease-in-out;
    text-decoration: underline;
    z-index: 1;
    ${elevate(2)};
    filter: none;
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
  min-height: var(--window-height);
`;

export default function SocialPage() {
  const data = useStaticQuery(graphql`
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
  `);
  return (
    <Page>
      <Meta {...meta} />
      {data.allInternetsYaml.edges.map((edge, i) => (
        <SocialSquare key={i} {...edge.node} />
      ))}
    </Page>
  );
}
