const expect = chai.expect


describe('update task when given invalid input', function () {
  it('should return error when given status input is object', function () {
    const result = app.api.updateTask(1, 'test', {})
    expect(result).to.be.eqls('status given is not a boolean')
  })
  it('should return error when given status input is array', function () {
    const result = app.api.updateTask(1, 'test', [])
    expect(result).to.be.eqls('status given is not a boolean')
  })
  it('should return error when not given status input', function () {
    const result = app.api.updateTask(1, 'test')
    expect(result).to.be.eqls('status given is not a boolean')
  })
  it('should return error when given status input is null', function () {
    const result = app.api.updateTask(1, 'test', null)
    expect(result).to.be.eqls('status given is not a boolean')
  })
  it('should return error when given description input is object', function () {
    const result = app.api.updateTask(1, {}, true)
    expect(result).to.be.eqls(`description-${{}} is not a string`)
  })
  it('should return error when given description input is array', function () {
    const result = app.api.updateTask(1, [], true)
    expect(result).to.be.eqls(`description-${[]} is not a string`)
  })
  it('should return error when not given description input', function () {
    const result = app.api.updateTask(1, undefined, true)
    expect(result).to.be.eqls(`description-${undefined} is not a string`)
  })
  it('should return error when given status description is null', function () {
    const result = app.api.updateTask(1, null, true)
    expect(result).to.be.eqls(`description-${null} is not a string`)
  })
})

describe('update all when given invalid input', function () {
  it('should return error when given status input is object', function () {
    const result = app.api.updateAll({})
    expect(result).to.be.eqls('status given is not a boolean')
  })
  it('should return error when given status input is array', function () {
    const result = app.api.updateAll([])
    expect(result).to.be.eqls('status given is not a boolean')
  })
  it('should return error when not given status input', function () {
    const result = app.api.updateAll()
    expect(result).to.be.eqls('status given is not a boolean')
  })
  it('should return error when given status input is null', function () {
    const result = app.api.updateAll(null)
    expect(result).to.be.eqls('status given is not a boolean')
  })
})

describe('deleteTask when given invalid id', function () {
  it('should return error when given id is object', function () {
    const result = app.api.deleteTask({})
    expect(result).to.be.eqls(`id-${{}} is not a number`)
  })
  it('should return error when given id is array', function () {
    const result = app.api.deleteTask([])
    expect(result).to.be.eqls(`id-${[]} is not a number`)
  })
  it('should return error when not given id', function () {
    const result = app.api.deleteTask()
    expect(result).to.be.eqls(`id-${undefined} is not a number`)
  })
  it('should return error when given id is null', function () {
    const result = app.api.deleteTask(null)
    expect(result).to.be.eqls(`id-${null} is not a number`)
  })
})

