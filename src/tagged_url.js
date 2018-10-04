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
    let url = this.path.reduce((acc,part,i)=>`${acc}${this.template[i]}:${part.name}`,'')
    if(this.query.length){
      url += this.template[this.path.length]
    }
    return url
  }
  buildUrl(options={}){
    const pathParam = options.path ||{}
    const queryParam = options.query ||{}
    let url = this.path.reduce((acc,part,i)=>{
      const name = this.path[i].name
      const p = name in pathParam? pathParam[name]:this.path[i].generate()
     return acc+this.template[i]+p
    },'')
    if(this.query.length){
      url += this.template[this.path.length]
    }
    const queryPart = this.query.reduce((acc,part,i)=>{
      const name = this.query[i].name
      const q = name in queryParam? queryParam[name]:this.query[i].generate()
      return acc.concat([part.name+'='+q])
    },[])
    const queryStr = queryPart.join('&')
    return url.indexOf('&')>0?`${url}&${queryStr}`:`${url}${queryStr}`
  }
  buildBody(options={}){
    const example = options.body || {}
    return this.body.reduce((acc,p)=>Object.assign({[p.name]:p.generate()},acc),example)
  }
  buildHeaders(options={}){
    const example = options.headers || {}
    return this.headers.reduce((acc,p)=>Object.assign({[p.name]:p.generate()},acc),example)
  }
}

module.exports = TaggedUrl