const request = require("request")
const Parameter = require("./parameter")
class TaggedRequest{
  constructor(options){
    this.taggedUrl = options.taggedUrl
  }
  call(parametersDescription, body,headers){
    const parameters = this.taggedUrl.pathParameters.concat(this.taggedUrl.queryParameters)
      .map(p=>new Parameter(p,parametersDescription[p]))
      .map(p=>p.generate())
    this.generatedUrl = this.taggedUrl.buildUrl(parameters)
    console.log(this.generatedUrl)
    const k = parametersDescription ? parametersDescription[Symbol.body]:null
    //return new Promise((resolve,reject)=>request[this.method](url,parameters, (err,d)=>err?reject(err):resolve(d)))
  }
}

module.exports = TaggedRequest