const {assert} = require("chai")
const TaggedRequest = require('../src/tagged_request')
const {get} = require("../src/tagged_templates")
test('Test builded', () => {
  const taggedUrl = get`https://domain.com/${"language"}/path/${"id"}?${["query1","query2"]}`
  const taggedRequest = new TaggedRequest({taggedUrl})
  taggedRequest.call({
    language:String,
    id:Number,
    query1:String,
    query2:Boolean
  })
  console.log(taggedRequest)
})