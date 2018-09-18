class TaggedUrl{
  constructor({template,method,pathParameters,queryParameters}){
    this.template = template
    this.method = method
    this.pathParameters = pathParameters
    this.queryParameters = queryParameters
  }
  buildUrl(parameters){
    let url = this.pathParameters.reduce((acc,part,i)=>{
      return acc + this.template[i]+parameters[i]
    },'')
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