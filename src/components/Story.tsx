import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from '@emotion/styled';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { shadows } from 'style/snippets';
import sizes from 'style/sizes';
import Meta from 'components/Meta';

const maxWidth = 800;
const sidePadding = '2.5%';

const Content = styled.div`
  max-width: ${maxWidth}px;
  margin: 0 auto;
  padding: 20px ${sidePadding};
  main {
    padding-top: 10px;
    p,
    li {
      font-family: ${props => props.theme.serif};
    }
    img,
    video,
    figure {
      display: block;
      margin: 0 auto;
      max-width: 100%;
    }
    img,
    iframe,
    video {
      ${shadows()};
    }
    @media (min-width: ${sizes.large}) {
      padding-left: 0;
      padding-right: 0;
    }
    figcaption {
      font-size: 0.8em;
      margin: 10px auto 15px;
      color: ${props => props.theme.comment};
      text-align: center;
      line-height: 1.3;
      max-width: ${0.9 * maxWidth}px;
    }
    blockquote,
    .quote {
      font-family: ${props => props.theme.serif};
      font-size: 1em;
      border-left: 4px solid #dfe2e5;
      margin: 0px 0px 16px 0px;
      padding: 0px 16px;
      white-space: pre;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
    h1,
    h2,
    h3,
    h4 {
      margin-top: 0.75rem;
    }
    .anchor {
      display: none;
      @media (min-width: ${sizes.medium}) {
        display: block;
      }
      float: left;
      padding-right: 4px;
      margin-left: -20px;
      opacity: 0;
      transition: opacity 200ms;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      &:hover .anchor {
        opacity: 1;
      }
    }
  }
`;

const Header = styled.div`
  position: relative;
`;

const HeaderImg = styled(Img)`
  min-height: 50vh;
  max-height: 700px;
`;

const HeaderContent = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  padding: 20px ${sidePadding};
  color: white;
  text-shadow: ${props => props.theme.textShadow};
  max-width: ${maxWidth}px;
  margin: 0 auto;
  @media (min-width: ${sizes.medium}) {
    font-size: 2em;
  }
  @media (min-width: ${sizes.large}) {
    padding-left: 0;
    padding-right: 0;
  }
  h1 {
    margin-bottom: 0;
    font-size: 3em;
  }
`;

const DatesContainer = styled.div`
  font-size: 0.9em;
  margin-bottom: 20px;
  &,
  a {
    color: ${props => props.theme.gray};
  }
`;

const Description = styled.h2`
  font-weight: 300;
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.6em;
  @media (min-width: ${sizes.medium}) {
    font-size: 1.8em;
  }
`;

const Dates = props => {
  const written = <div>Published {props.publication}</div>;
  const edited = props.publication !== props.lastEdit && (
    <div>
      <a href={props.lastEditUrl} target="_blank" rel="noopener noreferrer">
        Last edited
      </a>{' '}
      {props.lastEdit}
    </div>
  );
  return (
    <DatesContainer>
      {written}
      {edited}
    </DatesContainer>
  );
};

function Story({ data }) {
  // default to the header, fallback to the image
  const image = data.mdx.frontmatter.header || data.mdx.frontmatter.image;
  return (
    <>
      <Meta
        title={data.mdx.frontmatter.title}
        keywords={data.mdx.frontmatter.tags}
        description={data.mdx.frontmatter.description}
        image={image.childImageSharp.fluid.src}
      />
      <Header>
        <HeaderImg sizes={image.childImageSharp.fluid} />
        <HeaderContent>
          <h1>{data.mdx.frontmatter.title}</h1>
        </HeaderContent>
      </Header>
      <Content>
        <Description>{data.mdx.frontmatter.description}</Description>
        <Dates
          publication={data.mdx.frontmatter.publication}
          lastEdit={data.mdx.frontmatter.lastEdit}
          lastEditUrl={data.mdx.fields.lastEditUrl}
        />
        <main>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </main>
      </Content>
    </>
  );
}

export default Story;

export const pageQuery = graphql`
  query StoryQueryByPath($path: String!, $imageFocus: ImageCropFocus) {
    site {
      siteMetadata {
        repo
      }
    }
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      fields {
        lastEditUrl
      }
      frontmatter {
        publication(formatString: "dddd MMMM Do, YYYY")
        lastEdit(formatString: "dddd MMMM Do, YYYY")
        path
        title
        description
        tags
        image {
          childImageSharp {
            fluid(maxWidth: 1600, maxHeight: 700, cropFocus: $imageFocus) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        header {
          childImageSharp {
            fluid(maxWidth: 1600, maxHeight: 700, cropFocus: $imageFocus) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
