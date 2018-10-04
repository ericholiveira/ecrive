
const renderKeyValue= (key,value)=> `"${key}":${renderObject(value)}`
const renderObject = function(object){
  if(typeof object === 'object'){
    return `{\n\t${Object.keys(object).map(k=>renderKeyValue(k,object[k])).join(',\n\t')}\n}`
  }
  return JSON.stringify(object)
}
module.exports = function(object){
  if(!object){
    return ""
  }
  return renderObject(object)
}