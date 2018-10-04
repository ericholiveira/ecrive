const {assert} = require("chai")
const {get,post,getDocs} = require("../src/tagged_templates")("TESTE!!!!!!")
const params = {
  path: {
    language: String,
    id: Number,
  },
  query: {
    query1: String,
    query2: Boolean
  },
  body:{
    body1:Date,
    body2:[1,2,3]
  },
  headers:{
    header1:{
      type:String,
      required:false
    },
    header2:{
      type:String,
      factory:()=>"header2"
    }
  }
}
test('Test builded', async () => {
  const taggedRequest = post(params)`https://google.com/${"language"}/path/${"id"}?${["query1","query2"]}`
  //const taggedUrl = get`https://insights.winnin.com/ping?${["query1","query2"]}`
  //console.log(taggedRequest)
  const a =await taggedRequest({query:{query1:"ab"}, body:{body2:8},path:{id:-97},headers:{header2:"bla"}})
  console.log(getDocs("Uma bela introdução"))
  return a

})