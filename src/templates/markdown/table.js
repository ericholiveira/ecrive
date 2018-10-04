module.exports = function(title, params=[]){
  if(!params.length){
    return ""
  }
  return `${title}

|  Parameters  |  Types  |  Required  |  Options  |
| ------------ | ------- | ---------- | --------- |
${params.map(p=>`|  ${p.name}  |  ${p.type}  |  ${p.required}  |  ${p.enumOptions?p.enumOptions:"--"}  |`).join('\n')}`
}