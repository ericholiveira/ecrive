const buildTable = (title, params)=>params && params.length?`${title}

|  Parameters  |  Types  |  Required  |  Options  |
| ------------ | ------- | ---------- | --------- |
${params.map(p=>`|  ${p.name}  |  ${p.type}  |  ${p.required}  |  ${p.enumOptions?p.enumOptions:"--"}  |`).join('\n')}
`: ''

const buildExample = (examples)=>`##### EXAMPLE
  ${examples.map(e=>JSON.stringify(e.request.body))}
`
module.exports = function({title,taggedUrl, examples}){
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