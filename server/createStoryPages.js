const path = require('path');

async function createStoryPages({
  boundActionCreators: { createPage },
  graphql
}) {
  const storyTemplate = path.resolve(`src/components/Story.js`);
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    throw result.errors;
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `/${node.frontmatter.slug}`,
      component: storyTemplate,
      context: {
        slug: node.frontmatter.slug
      }
    });
  });
}

module.exports = createStoryPages;
