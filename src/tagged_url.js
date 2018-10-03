const Parameter = require("./parameter")
class TaggedUrl{
  constructor({template,method,path,query,description}){
    this.template = template
    this.method = method
    this.path = (path||[]).map(p=>new Parameter(p,description.path && description.path[p]))
    this.query = (query||[]).map(p=>new Parameter(p,description.query && description.query[p]))
    this.body = Object.keys(description.body||{}).map(p=>new Parameter(p,description.body && description.body[p]))
    this.headers = Object.keys(description.headers||{}).map(p=>new Parameter(p,description.headers && description.headers[p]))
  }
  buildDocumentationUrl(){
    let url = this.path.reduce((acc,part,i)=>`${acc}${this.template[i]}<${part.name}>`,'')
    if(this.query.length){
      url += this.template[this.path.length]
    }
    return url
  }
  buildUrl(){
    let url = this.path.reduce((acc,part,i)=>acc + this.template[i]+this.path[i].generate(),'')
    if(this.query.length){
      url += this.template[this.path.length]
    }
    const queryPart = this.query.reduce((acc,part,i)=>{
      return acc.concat([part.name+'='+this.query[i].generate()])
    },[])
    const queryStr = queryPart.join('&')
    return url.indexOf('&')>0?`${url}&${queryStr}`:`${url}${queryStr}`
  }
}

module.exports = TaggedUrl