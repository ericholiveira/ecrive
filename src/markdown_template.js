const buildTable = (title, params)=>params && params.length?`${title}

|  Parameters  |  Types  |  Required  |  Options  |
| ------------ | ------- | ---------- | --------- |
${params.map(p=>`|  ${p.name}  |  ${p.type}  |  ${p.required}  |  ${p.enumOptions?p.enumOptions:"--"}  |`).join('\n')}` : ''

const addQuoteIfNeeded= value=> typeof value === 'number' || typeof value === 'boolean'?value:`"${value}"`

const buildExampleJson = (title,object)=>object?`${title}
${typeof object === 'object'?`{\n\t${Object.keys(object).map(k=>`"${k}":${addQuoteIfNeeded(object[k])}`).join(',\n\t')}\n}`:JSON.stringify(object)}
`:''

const buildExampleRequest= (request,response)=>`${request.method.toUpperCase()} ${request.url}

${buildExampleJson('Headers',request.headers)}

${buildExampleJson('Body',request.body)}

Result: ${response.statusCode}
${buildExampleJson('',response.body)}
`
const buildExample = (examples)=>`##### EXAMPLE
  ${examples.map(e=>buildExampleRequest(e.request,e.response))}
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