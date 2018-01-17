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
              path
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
      path: node.frontmatter.path,
      component: storyTemplate
    });
  });
}

module.exports = createStoryPages;
