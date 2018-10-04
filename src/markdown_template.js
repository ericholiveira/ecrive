
module.exports = function({title,taggedUrl, examples}){
  return `
### ${title}

##### ${taggedUrl.buildDocumentationUrl()}

Path
${taggedUrl.path.map(p=>`- ${p.name}: ${p.type}`).join('\n')}

Query
${taggedUrl.query.map(q=>`- ${q.name}: ${q.type}`).join('\n')}

Body
${taggedUrl.body.map(q=>`- ${q.name}: ${q.type}`).join('\n')}

Headers
${taggedUrl.headers.map(q=>`- ${q.name}: ${q.type}`).join('\n')}

##### EXAMPLE

${examples}`
}