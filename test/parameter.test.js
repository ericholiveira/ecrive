const {expect} = require("chai")
const Parameter = require("../src/parameter")
test('A Parameter must support the basic types', async () => {
  const testType = function(type){
    const name = "name"
    const parameter = new Parameter(name,{type})
    expect(parameter.type).to.equal(type.name)
    expect(parameter.name).to.equal(name)
    expect(parameter.description).to.equal("")
    expect(parameter.required).to.equal(true)
  }
  testType(Number)
  testType(String)
  testType(Boolean)
  testType(Date)
})
test('A Parameter must support enums', async () => {
  const name = "name"
  const parameter = new Parameter(name,{enumOptions:[1,2,3]})
  expect(parameter.type).to.equal("Enum")
  expect(parameter.name).to.equal(name)

  const parameter2 = new Parameter(name,[1,2,3])
  expect(parameter2.type).to.equal("Enum")
  expect(parameter2.name).to.equal(name)
})

test('A Parameter must support all basic options', async () => {
  const [name,type,description,required,factory] = ["name",String,"description",false, ()=>name]
  const parameter = new Parameter(name,{type,description,required,factory})
  expect(parameter.type).to.equal(type.name)
  expect(parameter.name).to.equal(name)
  expect(parameter.description).to.equal(description)
  expect(parameter.required).to.equal(false)
  expect(parameter.factory).to.equal(factory)
})

test('A Parameter must generate dummy data', async () => {
  const testData = function(type){
    const name = "name"
    const parameter = new Parameter(name,{type})
    expect(parameter.generate()).to.be.a(type.name)
  }
  testData(Number)
  testData(String)
  testData(Boolean)
  testData(Date)
})
test('A Parameter must generate dummy data from factory', async () => {
  const [name,type,factory] = ["name",String, ()=>name]
  const parameter = new Parameter(name,{type,factory})
  expect(parameter.generate()).to.equal(name)
})
test('A Parameter must generate dummy data from enum', async () => {
  const name = "name"
  const parameter = new Parameter(name,[1,2,3])
  const generated = parameter.generate()
  expect(generated >=1 && generated <= 3).to.equal(true)
})