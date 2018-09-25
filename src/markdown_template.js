module.exports = function({title,documentUrl, pathParameters=[],queryParameters=[],body,headers, request, response}){
  return `
    ### ${title}
    
    ##### ${documentUrl}
    
    Path
    ${pathParameters.map(p=>"- "+p)}
    
    Query
    ${queryParameters.map(q=>"- "+q)}
    
    Body
    ${body}
    
    Headers
    ${headers}
    
    ##### EXAMPLE
    
    ${request}
    
    
    ${response}
    
  `
}