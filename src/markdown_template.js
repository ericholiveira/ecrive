
module.exports = function({title,documentUrl, path=[],query=[], examples}){
  return `
### ${title}

##### ${documentUrl}

Path
${path.map(p=>`- ${p.name}: ${p.type}`).join('\n')}

Query
${query.map(q=>`- ${q.name}: ${q.type}`).join('\n')}

Body
${/*body*/1}

Headers
${/*headers*/2}

##### EXAMPLE

${examples}`
}