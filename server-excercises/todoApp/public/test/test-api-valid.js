var expect = chai.expect

var dbState = [
  { id: 297, status: false, description: 'eat' },
  { id: 298, status: true, description: 'sleep' },
  { id: 299, status: true, description: 'work' },
  { id: 300, status: false, description: 'repeat' }

]

describe('read Data from server', function () {
  it('should return array of objects from the database', function (done) {
    app.api.readTasks()
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        expect(result).to.be.eqls(dbState)
        done()
      })
  })
})

describe('update task when given valid input', function () {
  it('should update objects in database when given valid  status input', function (done) {
    app.api.updateTask(dbState[0].id, dbState[0].description, true)
      .then((response) => {
        return response.text()
      })
      .then((result) => {
        dbState[0].status = true
        expect(result).to.be.eqls('Updated')
        done()
      })
  })

  it('should update objects in database when given valid description input', function (done) {
    app.api.updateTask(dbState[0].id, 'newEat', dbState[0].status)
      .then((response) => {
        return response.text()
      })
      .then((result) => {
        dbState[0].description = 'newEat'
        expect(result).to.be.eqls('Updated')
        done()
      })
  })
})

describe('updateall when given valid boolean', function () {
  it('should update all the tasks to be completed', function (done) {
    app.api.updateAll(true)
      .then((response) => {
        return response.text()
      })
      .then((result) => {
        dbState.forEach(task => task.status = true)
        expect(result).to.be.eqls('Updated all')
        done()
      })
  })
})

describe('insertTask when given valid description', function () {
  it('should insert new task in table and return an id', function (done) {
    app.api.insertTask('New task')
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        dbState.push({ id: 301, description: 'New task', status: false })
        expect(result[0].id).to.be.eqls(301)
        done()
      })
  })
})

describe('deleteTask when given valid id', function () {
  it('should delete a task in table', function (done) {
    app.api.deleteTask(dbState[0].id)
      .then((response) => {
        return response.text()
      })
      .then((result) => {
        dbState.splice(0, 1)
        expect(result).to.be.eqls('Deleted')
        done()
      })
  })
})

describe('deleteCompleted when called', function () {
  it('should delete all completed tasks table', function (done) {
    app.api.deleteCompleted()
      .then((response) => {
        return response.text()
      })
      .then((result) => {
        dbState = dbState.filter(todo => !todo.status)
        expect(result).to.be.eqls('Delete completed')
        done()
      })
  })
})

describe('readTasks when called', function () {
  it('should return data as expected after performing all tasks', function (done) {
    app.api.readTasks()
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        expect(result).to.be.eqls(dbState)
        done()
      })
  })
})
