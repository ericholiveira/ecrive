const {assert} = require("chai")
const TaggedRequest = require('../src/tagged_request')
const {get} = require("../src/tagged_templates")
test('Test builded', async () => {
  const taggedUrl = get`https://insights.winnin.com/${"language"}/path/${"id"}?${["query1","query2"]}`
  //const taggedUrl = get`https://insights.winnin.com/ping?${["query1","query2"]}`
  const taggedRequest = new TaggedRequest({taggedUrl})
  //console.log(taggedRequest)
  const a =await taggedRequest.call({
    language:String,
    id:Number,
    query1:String,
    query2:Boolean
  }).then(console.log)
  console.log(taggedRequest.getDocs())
  return a

})