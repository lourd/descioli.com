import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Head from 'react-helmet';
import { shadows, textShadow } from 'style/snippets';
import sizes from 'style/sizes';

const meta = {
  title: `My life's works`,
  description: 'A listing of my major works in professional life',
  keywords: [
    'projects',
    'code',
    'software engineering',
    'software design',
    'portfolio',
    'design',
    'stories',
    'entreprenuership',
    'innovation'
  ]
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
  ${textShadow};
  padding: 5px 15px;
`;

const ProjectLink = styled(Link)`
  display: block;
  position: relative;
  max-width: 600px;
  margin: 50px 15px;
  width: 100%;
  color: white;
  ${shadows()};
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
    margin-top: 20px;
  }
`;

const Works = props => (
  <Container>
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords.join(',')} />
    </Head>
    <h1>{meta.title}</h1>
    <Projects>
      {props.data.allMarkdownRemark.edges.map(({ node }, i) => (
        <Project
          key={i}
          path={node.frontmatter.path}
          title={node.frontmatter.title}
          image={node.frontmatter.image.childImageSharp.sizes}
          description={node.frontmatter.description}
        />
      ))}
    </Projects>
  </Container>
);

export const pageQuery = graphql`
  query ProjectsQuery {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: ["project"] } } }
      sort: { order: DESC, fields: [frontmatter___creation] }
    ) {
      edges {
        node {
          frontmatter {
            title
            path
            description
            image {
              childImageSharp {
                sizes(maxWidth: 600, maxHeight: 600) {
                  ...GatsbyImageSharpSizes_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default Works;
