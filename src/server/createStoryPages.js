const path = require('path')

async function createStoryPages({
  boundActionCreators: { createPage },
  graphql,
}) {
  const storyTemplate = path.resolve(`src/components/Story.js`)
  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { tags: { in: ["portfolio"] } } }
      ) {
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
  `)
  if (result.errors) {
    throw result.errors
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: storyTemplate,
      context: {
        imageFocus: node.frontmatter.imageFocus,
      },
    })
  })
}

module.exports = createStoryPages
