const markdownTemplate = require("./markdown_template")
class TaggedDocumentation{
  constructor(options){
    this.taggedUrl = options.taggedUrl
    this.request = options.request
    this.response = options.response
  }
  toString(){
    const documentUrl = this.taggedUrl.buildDocumentationUrl()
    return markdownTemplate({
      title:"TEMP",
      documentUrl,
      pathParameters:this.taggedUrl.pathParameters,
      queryParameters: this.taggedUrl.queryParameters,
      body:this.request.body,
      headers:this.request.headers,
      request:this.request,
      response:this.response
    })
  }
}

module.exports = TaggedDocumentation