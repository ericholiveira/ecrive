
module.exports = function({title,documentUrl, path=[],query=[], examples}){
  return `
### ${title}

##### ${documentUrl}

Path
${path.map(p=>"- "+p.name).join('\n')}

Query
${query.map(q=>"- "+q.name).join('\n')}

Body
${/*body*/1}

Headers
${/*headers*/2}

##### EXAMPLE

${examples}`
}