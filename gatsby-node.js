const createStoryPages = require('./src/server/createStoryPages')
const augmentMarkdownNode = require('./src/server/augmentMarkdownNode')

exports.createPages = async props => {
  await createStoryPages(props)
}

exports.onCreateNode = props => {
  augmentMarkdownNode(props)
}
