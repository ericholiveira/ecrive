const {expect} = require("chai")
const Example = require("../src/example")
test('An example must have a request and a response', async () => {
  const [request,response] = ["request", "response"]
  const example = new Example({request,response})
  expect(example.request).to.equal(request)
  expect(example.response).to.equal(response)
})