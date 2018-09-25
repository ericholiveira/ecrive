const requestLib = require("request")
const Parameter = require("./parameter")
const Documentation = require("./documentation")
class TaggedRequest{
  constructor(options){
    this.taggedUrl = options.taggedUrl
    this.documentation = null
  }
  async call(parametersDescription){
    const parameters = this.taggedUrl.pathParameters.concat(this.taggedUrl.queryParameters)
      .map(p=>new Parameter(p,parametersDescription[p]))
      .map(p=>p.generate())
    const url = this.taggedUrl.buildUrl(parameters)
    const _body = parametersDescription ? parametersDescription[Symbol.body]:null
    const _headers = parametersDescription ? parametersDescription[Symbol.headers]:null
    const {method} = this.taggedUrl
    const request = {
      url,
      method,
      json:true,
      body:_body,
      headers:_headers,
    }
    const response = await new Promise((resolve,reject)=>requestLib(request, (err,d)=>err?reject(err):resolve(d)))
    this.documentation = new Documentation({taggedUrl:this.taggedUrl,request,response})
    return response.body
  }
  getDocs(){
    return this.documentation && this.documentation.toString()
  }
}

module.exports = TaggedRequest