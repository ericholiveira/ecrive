const TaggedRequest = require('./tagged_request')
const {get} = require("./tagged_templates")
const noop = function(){}
module.exports = function test(description,taggedUrl,parameterDescription,assertion=noop){
  const taggedRequest = new TaggedRequest({taggedUrl})
  return taggedRequest.call(parameterDescription)
}
module.exports("My test", get`https://www.winnin.com/${"language"}/path/${"id"}?${["query1","query2"]}`,{
  language:String,
  id:Number,
  query1:String,
  query2:Boolean
})