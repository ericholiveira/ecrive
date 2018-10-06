const TaggedRequest = require('./tagged_request')
const TaggedUrl = require('./tagged_url')
const fs = require("fs")

const requests = []
const buildTaggedRequest = function(title,method, template,values,description={}){
  const lastItem = values.length? values[values.length -1] : []
  const query = Array.isArray(lastItem) ? lastItem : []
  const path  = values.length && Array.isArray(lastItem) ? values.slice(0,values.length-1) : values
  if(moduleData.globals.__SERVER_URL__){
    template = [].concat(template)
    template[0] = moduleData.globals.__SERVER_URL__+template[0]
  }
  
  const taggedRequest = TaggedRequest(title,new TaggedUrl({template,method,path,query,description}))
  requests.push(taggedRequest)
  return taggedRequest
}
const forTitleAndMethod = function(title,method){
  return function(templateOrObject, ...values){
    if(Array.isArray(templateOrObject)){
      return buildTaggedRequest(title,method,templateOrObject,values)
    }else{
      return function(template,...values){
        return buildTaggedRequest(title,method,template,values,templateOrObject)
      }
    }
  }
}
const moduleData = function(title){
  return {
    get:forTitleAndMethod(title,'get'),
    head:forTitleAndMethod(title,'head'),
    post:forTitleAndMethod(title,'post'),
    put:forTitleAndMethod(title,'put'),
    "delete":forTitleAndMethod(title,'delete'),
    connect:forTitleAndMethod(title,'connect'),
    options:forTitleAndMethod(title,'options'),
    trace:forTitleAndMethod(title,'trace'),
    patch:forTitleAndMethod(title,'patch'),
    getDocs(introduction="",{path}={}){
      const docs = [introduction].concat(requests.map(r=>r.getDocs())).join("\n\n")
      fs.writeFileSync(path || "API.md",docs)
    }
  }
}
moduleData.globals={
  __SERVER_URL__: ""
}  
module.exports = moduleData