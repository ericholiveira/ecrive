const requestLib = require("request")
const Example = require("./example")
const markdownTemplate = require("./templates/markdown")

module.exports = function TaggedRequest(title,taggedUrl){
  const call = async function(options){
    const uri = call.taggedUrl.buildUrl(options)
    const headers = call.taggedUrl.buildHeaders(options)
    const body = call.taggedUrl.buildBody(options)
    const {method} = call.taggedUrl
    const request = {
      uri,
      method,
      json:true,
      body,
      headers
    }
    const response = await new Promise((resolve,reject)=>requestLib(request, (err,d)=>err?reject(err):resolve(d)))
    call.examples.push(new Example({request,response}))
    return response
  }
  call.getDocs = function(){
    return markdownTemplate(title,call.taggedUrl,call.examples)
  }
  call.taggedUrl = taggedUrl
  call.examples = []
  return call
}