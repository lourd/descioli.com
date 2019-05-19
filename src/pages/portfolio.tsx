import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Meta from 'components/Meta';
import { shadows } from 'style/snippets';
import sizes from 'style/sizes';

const meta = {
  title: `Portfolio`,
  description: 'Notable jobs & projects of my career',
  keywords: [
    'projects',
    'code',
    'software engineering',
    'software design',
    'making',
    'portfolio',
    'design',
    'stories',
    'entreprenuership',
    'innovation',
  ],
};

const StyledImg = styled(Img)`
  display: block;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-shadow: ${props => props.theme.textShadow};
  padding: 5px 15px;
`;

const ProjectLink = styled(Link)`
  display: block;
  position: relative;
  max-width: 600px;
  margin: 50px 0px;
  width: 100%;
  color: white;
  ${shadows()};
  overflow: hidden;
  @media (min-width: ${sizes.large}) {
    margin: 20px 15px;
  }
  h2 {
    z-index: 1;
    margin-bottom: 0;
    font-weight: bold;
    font-size: 2.6em;
    @media (min-width: ${sizes.medium}) {
      font-size: 4em;
    }
  }
  h3 {
    font-weight: 300;
    margin-top: 10px;
    margin-bottom: 0;
  }
  .gatsby-image-outer-wrapper {
    width: 100%;
  }
  .gatsby-image-wrapper {
    transition: transform 0.25s, filter 0.25s;
    filter: blur(5px);
  }
  &:hover,
  &:focus {
    .gatsby-image-wrapper {
      transform: scale(1.03);
      filter: blur(0px);
    }
  }
`;

const Project = props => (
  <ProjectLink to={props.path}>
    <Content>
      <h2>{props.title}</h2>
      <h3>{props.description}</h3>
    </Content>
    <StyledImg sizes={props.image} />
  </ProjectLink>
);

const Projects = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
`;

const Container = styled.div`
  padding: 20px 2.5%;
  h1 {
    font-size: 3.5em;
    margin: 20px auto;
    margin-top: 20px;
    max-width: 600px;
    @media (min-width: ${sizes.xxl}) {
      max-width: 92%;
    }
  }
`;

const Portfolio = () => {
  const data = useStaticQuery(graphql`
    query ProjectsQuery {
      allMdx(
        filter: { frontmatter: { tags: { in: ["portfolio"] } } }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            frontmatter {
              title
              path
              description
              image {
                childImageSharp {
                  # 3% more than 600, the maxWidth set in style
                  fluid(maxWidth: 620, maxHeight: 620) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  return (
    <Container>
      <Meta {...meta} />
      <h1>My life's works</h1>
      <Projects>
        {data.allMdx.edges.map(({ node }, i) => (
          <Project
            key={i}
            path={node.frontmatter.path}
            title={node.frontmatter.title}
            image={node.frontmatter.image.childImageSharp.fluid}
            description={node.frontmatter.description}
          />
        ))}
      </Projects>
    </Container>
  );
};

export default Portfolio;
