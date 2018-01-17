import React from 'react';
import styled from 'styled-components';
import Head from 'react-helmet';
import Img from 'gatsby-image';
import { shadows, textShadow } from 'style/snippets';
import colors from 'style/colors';
import sizes from 'style/sizes';

const maxWidth = '800px';
const sidePadding = '2.5%';

const Page = styled.div``;
const Content = styled.div`
  max-width: ${maxWidth};
  margin: 0 auto;
  padding: 15px ${sidePadding};
  img {
    display: block;
    margin: 1.6em auto;
    max-width: 100%;
  }
  .gatsby-resp-iframe-wrapper,
  img,
  .gatsby-resp-image-wrapper {
    ${shadows()};
  }
  .gatsby-resp-iframe-wrapper {
    margin-bottom: 10px;
  }
  @media (min-width: ${sizes.large}) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const Header = styled.div`
  position: relative;
  max-height: 600px;
  overflow: hidden;
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
  ${textShadow};
  max-width: ${maxWidth};
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
  color: ${colors.gray};
  font-size: 0.9em;
  margin-bottom: 20px;
`;

const Description = styled.h2`
  font-weight: 300;
  margin-bottom: 15px;
  @media (min-width: ${sizes.medium}) {
    font-size: 2em;
  }
`;

const Dates = props => {
  const written = <div>Published {props.creation}</div>;
  const edited = props.creation !== props.lastEdit && (
    <div>Last edited {props.lastEdit}</div>
  );
  return (
    <DatesContainer>
      {written}
      {edited}
    </DatesContainer>
  );
};

const Story = ({ data }) => {
  return (
    <Page>
      <Head>
        <title>{data.markdownRemark.frontmatter.title}</title>
        <meta
          name="description"
          content={data.markdownRemark.frontmatter.description}
        />
        <meta
          name="keywords"
          content={data.markdownRemark.frontmatter.tags.join(',')}
        />
      </Head>
      <Header>
        <Img
          sizes={data.markdownRemark.frontmatter.image.childImageSharp.sizes}
        />
        <HeaderContent>
          <h1>{data.markdownRemark.frontmatter.title}</h1>
        </HeaderContent>
      </Header>
      <Content>
        <Description>{data.markdownRemark.frontmatter.description}</Description>
        <Dates
          creation={data.markdownRemark.frontmatter.creation}
          lastEdit={data.markdownRemark.frontmatter.lastEdit}
        />
        <main dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </Content>
    </Page>
  );
};

export default Story;

export const pageQuery = graphql`
  query StoryQueryByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        creation(formatString: "dddd MMMM DD, YYYY")
        lastEdit(formatString: "dddd MMMM DD, YYYY")
        path
        title
        description
        tags
        image {
          childImageSharp {
            sizes(maxWidth: 1000, maxHeight: 1000) {
              ...GatsbyImageSharpSizes_withWebp
            }
          }
        }
      }
    }
  }
`;
