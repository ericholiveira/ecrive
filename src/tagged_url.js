class TaggedUrl{
  constructor({template,method,pathParameters,queryParameters}){
    this.template = template
    this.method = method
    this.pathParameters = pathParameters
    this.queryParameters = queryParameters
  }
  buildDocumentationUrl(){
    const usedTemplate = []
    const result = this.pathParameters.reduce((acc,part,i)=>{
      usedTemplate.push(this.template[i])
      return `${acc}${this.template[i]}<${part}>`
    },'')
    if(usedTemplate.length<this.template.length){
      return result + this.template.filter((t,i)=>i>=usedTemplate.length).join('')
    }
    return result
  }
  buildUrl(parameters){
    const usedTemplate = []
    let url = this.pathParameters.reduce((acc,part,i)=>{
      usedTemplate.push(this.template[i])
      return acc + this.template[i]+parameters[i]
    },'')
    if(usedTemplate.length<this.template.length){
      url += this.template.filter((t,i)=>i<=usedTemplate.length).join('')
    }
    if(this.queryParameters.length){
      url += this.template[this.pathParameters.length]
    }
    const queryPart = this.queryParameters.reduce((acc,part,i)=>{
      return acc.concat([part+'='+parameters[this.pathParameters.length+i]])
    },[])
    const queryStr = queryPart.join('&')
    return url.indexOf('&')>0?`${url}&${queryStr}`:`${url}${queryStr}`
  }
}

module.exports = TaggedUrl