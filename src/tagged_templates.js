const TaggedUrl = require('./tagged_url')

const buildTaggedUrl = function(method, template,values){
  const lastItem = values.length? values[values.length -1] : []
  const queryParameters = Array.isArray(lastItem) ? lastItem : []
  const pathParameters  = values.length && Array.isArray(lastItem) ? values.slice(0,values.length-1) : values
  return new TaggedUrl({template,method,pathParameters,queryParameters})
}

module.exports = {
  get(template,...values){
    return buildTaggedUrl('get',template,values)
  },
  head(template,...values){
    return buildTaggedUrl('head',template,values)
  },
  post(template,...values){
    return buildTaggedUrl('post',template,values)
  },
  put(template,...values){
    return buildTaggedUrl('put',template,values)
  },
  "delete"(template,...values){
    return buildTaggedUrl('delete',template,values)
  },
  connect(template,...values){
    return buildTaggedUrl('connect',template,values)
  },
  options(template,...values){
    return buildTaggedUrl('options',template,values)
  },
  trace(template,...values){
    return buildTaggedUrl('trace',template,values)
  },
  patch(template,...values){
    return buildTaggedUrl('patch',template,values)
  }
}
/*
.call({
      language:"eng",
      id:"_id",
      query1:"_query1",
      query2:"_query2"
    })
* */