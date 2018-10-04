const buildExampleJson = require("./formatted_json")

module.exports = (request,response)=>`\`\`\`
\`${request.method.toUpperCase()}\` ${request.url}

**Headers**

${buildExampleJson(request.headers)}

**Body**

${buildExampleJson(request.body)}

**Result**
 
Status Code: ${response.statusCode}

${buildExampleJson(response.body)}
\`\`\``