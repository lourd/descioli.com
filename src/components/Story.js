import React from 'react';
import styled from 'styled-components';
import Blob from 'lib/components/Blob';

const Story = ({ data }) => {
  return <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />;
};

export default Story;

export const pageQuery = graphql`
  query StoryQueryBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`;
