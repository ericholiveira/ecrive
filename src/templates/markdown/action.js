const buildTable = require("./table")
const buildExampleRequest = require("./example")

const buildExample = (examples)=>`##### EXAMPLE
  ${examples.map(e=>buildExampleRequest(e.request,e.response))}
`
module.exports = function(title,taggedUrl, examples){
  return `
### ${title}

##### ${taggedUrl.buildDocumentationUrl()}

${buildTable('Path',taggedUrl.path)}

${buildTable('Query',taggedUrl.query)}

${buildTable('Body',taggedUrl.body)}

${buildTable('Headers',taggedUrl.headers)}

${buildExample(examples)}
`
}