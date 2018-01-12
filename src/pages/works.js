import React from 'react';
import Link from 'gatsby-link';

const Works = props => (
  <div>
    {props.data.allMarkdownRemark.edges.map((edge, i) => (
      <Link key={i} to={`/${edge.node.frontmatter.slug}`}>
        {edge.node.frontmatter.title}
        {edge.node.frontmatter.gif && (
          <img src={`/${edge.node.frontmatter.gif.relativePath}`} />
        )}
      </Link>
    ))}
  </div>
);

export const pageQuery = graphql`
  query ProjectsQuery {
    allMarkdownRemark(filter: { frontmatter: { tags: { in: ["project"] } } }) {
      edges {
        node {
          frontmatter {
            title
            slug
            gif {
              relativePath
            }
          }
        }
      }
    }
  }
`;

export default Works;
