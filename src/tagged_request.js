const requestLib = require("request")
const Example = require("./example")
const markdownTemplate = require("./markdown_template")

module.exports = function TaggedRequest(title,taggedUrl){
  const container = {
    taggedUrl,
    examples: []
  }
  const call = async function(){
    const url = container.taggedUrl.buildUrl()
    const _body = {}
    const _headers = {}
    const {method} = container.taggedUrl
    const request = {
      url,
      method,
      json:true,
      body:_body,
      headers:_headers,
    }
    const response = await new Promise((resolve,reject)=>requestLib(request, (err,d)=>err?reject(err):resolve(d)))
    container.examples.push(new Example({request,response}))
    return response
  }
  call.getDocs = function(){
    const documentUrl = container.taggedUrl.buildDocumentationUrl()
    return markdownTemplate({
      title,
      documentUrl,
      path:container.taggedUrl.path,
      query: container.taggedUrl.query,
      examples:container.examples
    })
  }
  return call
}