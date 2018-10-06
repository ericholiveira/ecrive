const buildExampleJson = require("./formatted_json")

const buildSectionIfNotNull=(title,object)=>!object?"":`
**${title}**

${buildExampleJson(object)}

`
module.exports = (request,response)=>`\`\`\`
\`${request.method.toUpperCase()}\` ${request.uri}

${buildSectionIfNotNull('Headers', request.headers)}

${buildSectionIfNotNull('Body', request.headers)}

**Result**
 
Status Code: ${response.statusCode}

${buildExampleJson(response.body)}
\`\`\``