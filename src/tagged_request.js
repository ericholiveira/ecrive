const requestLib = require("request")
const Example = require("./example")
const markdownTemplate = require("./templates/markdown")

module.exports = function TaggedRequest(title,taggedUrl){
  const container = {
    taggedUrl,
    examples: []
  }
  const call = async function(options){
    const uri = container.taggedUrl.buildUrl(options)
    const headers = container.taggedUrl.buildHeaders(options)
    const body = container.taggedUrl.buildBody(options)
    const {method} = container.taggedUrl
    const request = {
      uri,
      method,
      json:true,
      body,
      headers
    }
    const response = await new Promise((resolve,reject)=>requestLib(request, (err,d)=>err?reject(err):resolve(d)))
    container.examples.push(new Example({request,response}))
    return response
  }
  call.getDocs = function(){
    return markdownTemplate(title,container.taggedUrl,container.examples)
  }
  return call
}