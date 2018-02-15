/**
 * This is needed if we ever want to request the tableOfContents, which depends
 * on the existence of a node field named slug
 */
function augmentMarkdownNodes({
  node,
  boundActionCreators: { createNodeField },
  getNode,
  store,
}) {
  if (node.internal.type === `MarkdownRemark`) {
    createNodeField({
      name: 'slug',
      node,
      value: node.frontmatter.path,
    })
    const { relativePath } = getNode(node.parent)
    // it's relative to the root file that the source plugin was configured for
    // have to add back on where we configured it
    const path = `content/${relativePath}`
    const { repo } = store.getState().config.siteMetadata
    const lastEditUrl = `${repo}/commits/master/${path}`
    createNodeField({
      name: 'lastEditUrl',
      node,
      value: lastEditUrl,
    })
  }
}

module.exports = augmentMarkdownNodes
