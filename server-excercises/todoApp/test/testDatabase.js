const api = require('../api')
const chai = require('chai')
const expect = chai.expect
const dbState = [
  { id: 297, status: false, description: 'eat' },
  { id: 298, status: true, description: 'sleep' },
  { id: 299, status: true, description: 'work' },
  { id: 300, status: false, description: 'repeat' }
]

describe('read Data from server', function () {
  it('should return array of objects from the database', function (done) {
    api.readTasks()
      .then((result) => {
        expect(result).to.be.eqls(dbState)
        done()
      })
  })
})

describe('update task when given valid input', function () {
  it('should update objects in database when given valid  status input', function (done) {
    api.updateTask(dbState[0].id, dbState[0].description, true)
      .then((result) => {
        dbState[0].status = true
        expect(result).to.be.eqls([])
        done()
      })
  })

  it('should update objects in database when given valid description input', function (done) {
    api.updateTask(dbState[0].id, 'newEat', dbState[0].status)
      .then((result) => {
        dbState[0].description = 'newEat'
        expect(result).to.be.eqls([])
        done()
      })
  })
})

describe('update task when given invalid input', function () {
  it('should return error when given input id does not exist', function (done) {
    api.updateTask(987, 'test', true)
      .then((result) => {
        expect(result).to.be.eqls([])
        done()
      })
  })
  it('should return error when given status input is boolean in string', function () {
    const result = api.updateTask(1, 'test', 'true')
    expect(result).to.be.eqls('status given is not a boolean')
  })
  it('should return error when given id input is a float', function () {
    const result = api.updateTask(98.7, 'test', true)
    expect(result).to.be.eqls(`id-${98.7} is not a valid number`)
  })
  it('should return error when given id input is not a number', function () {
    const result = api.updateTask('', 'test', true)
    expect(result).to.be.eqls(`id-${''} is not a valid number`)
  })
  it('should return error when given status input is object', function () {
    const result = api.updateTask(1, 'test', {})
    expect(result).to.be.eqls('status given is not a boolean')
  })
  it('should return error when given status input is array', function () {
    const result = api.updateTask(1, 'test', [])
    expect(result).to.be.eqls('status given is not a boolean')
  })
  it('should return error when not given status input', function () {
    const result = api.updateTask(1, 'test')
    expect(result).to.be.eqls('status given is not a boolean')
  })
  it('should return error when given status input is null', function () {
    const result = api.updateTask(1, 'test', null)
    expect(result).to.be.eqls('status given is not a boolean')
  })
  it('should return error when given description input is object', function () {
    const result = api.updateTask(1, {}, true)
    expect(result).to.be.eqls(`description-${{}} is not a string`)
  })
  it('should return error when given description input is array', function () {
    const result = api.updateTask(1, [], true)
    expect(result).to.be.eqls(`description-${[]} is not a string`)
  })
  it('should return error when not given description input', function () {
    const result = api.updateTask(1, undefined, true)
    expect(result).to.be.eqls(`description-${undefined} is not a string`)
  })
  it('should return error when given status description is null', function () {
    const result = api.updateTask(1, null, true)
    expect(result).to.be.eqls(`description-${null} is not a string`)
  })
})
