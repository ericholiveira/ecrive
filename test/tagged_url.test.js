const {assert} = require("chai")
const {get,post} = require("../src/tagged_templates")("TESTE!!!!!!")
test('Test builded', async () => {
  /*const taggedRequest = post({
    path: {
      language: String,
      id: Number,
    },
    query: {
      query1: String,
      query2: Boolean
    }
  })`https://insights.winnin.com/${"language"}/path/${"id"}?${["query1","query2"]}`
  //const taggedUrl = get`https://insights.winnin.com/ping?${["query1","query2"]}`
  //console.log(taggedRequest)
  const a =await taggedRequest()
  console.log(taggedRequest.getDocs())
  return a*/

})