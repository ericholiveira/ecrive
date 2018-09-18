const faker = require('faker')
const factories = {
  "String": faker.random.word,
  "Number":faker.random.number,
  "Boolean":faker.random.boolean,
  "Date"(){
    return new Date()
  },
  "Enum"(options){
    return options[Math.floor(Math.random()*options.length)]
  }
}
const getType = function(options){
  if(typeof options === 'function'){
    return options.name
  }
  if(Array.isArray(options)){
    return "Enum"
  }
  if(options.type){
    return typeof options.type === 'function'?options.name:options
  }
}
class Parameter{
  constructor(name,options={}){
    options.type = options.type || String
    this.name = name
    this.enumOptions = options.enumOptions
    this.description = options.description || ""
    this.type = getType(options)
    if(!this.type){
      throw new Error(`No type found for parameter ${name}`)
    }
    this.required = options.required || true
    this.factory = options.factory || factories[this.type]
  }
  generate(){
    if(this.factory){
      this.example = this.factory(this.enumOptions)
      return this.example
    }
    if(this.required){
      throw new Error(`No factory found for required parameter ${this.name}`)
    }
  }
}
module.exports = Parameter