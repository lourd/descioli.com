const createStoryPages = require('./src/server/createStoryPages')
const addSlugToMarkdown = require('./src/server/addSlugToMarkdown')

exports.createPages = async props => {
  await createStoryPages(props)
}

exports.onCreateNode = props => {
  addSlugToMarkdown(props)
}
