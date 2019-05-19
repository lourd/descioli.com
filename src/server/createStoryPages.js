const path = require("path");

async function createStoryPages({ actions: { createPage }, graphql }) {
  const component = path.resolve(`src/components/Story.tsx`);
  const result = await graphql(`
    {
      allMdx(filter: { frontmatter: { tags: { in: ["portfolio"] } } }) {
        edges {
          node {
            frontmatter {
              path
              imageFocus
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    throw result.errors;
  }

  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component,
      context: {
        imageFocus: node.frontmatter.imageFocus
      }
    });
  });
}

module.exports = createStoryPages;
