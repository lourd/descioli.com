/**
 * This is needed if we ever want to request the tableOfContents, which depends
 * on the existence of a node field named slug
 */
function addSlugToMarkdown({ node, boundActionCreators: { createNodeField } }) {
  if (node.internal.type === `MarkdownRemark`) {
    createNodeField({
      name: 'slug',
      node,
      value: node.frontmatter.path,
    })
  }
}

module.exports = addSlugToMarkdown
