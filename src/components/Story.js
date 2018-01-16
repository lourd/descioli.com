import React from 'react';
import styled from 'styled-components';
import Head from 'react-helmet';

const Story = ({ data }) => {
  return (
    <div>
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
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </div>
  );
};

export default Story;

export const pageQuery = graphql`
  query StoryQueryBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        creation(formatString: "MMMM DD, YYYY")
        slug
        title
        description
        tags
        dates {
          start
          end
        }
      }
    }
  }
`;
