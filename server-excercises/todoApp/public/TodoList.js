app.TodoListOperations.deleteItemFromList = function (todo) {
  app.allTodos = app.allTodos.filter((item) => item.element.id !== todo.element.id)
  app.updateLists()
  app.updateHiddenDivisions()
}

app.TodoListOperations.deleteCompletedFromList = function () {
  app.allTodos = app.allTodos.filter((todo, index) => {
    return !(todo.status.checked)
  })
  app.updateLists()
  app.updateHiddenDivisions()
}

app.TodoListOperations.insertIntoList = function (id, description, status) {
  const todo = new TodoItem(id, description, status)
  app.allTodos.push(todo)
  app.updateHiddenDivisions()
  return todo
}

app.TodoListOperations.toggleListStatus = function (status) {
  app.allTodos.forEach((todo) => {
    todo.status.checked = status
    todo.setTaskStyle()
  })
  app.setView()
  if (app.page !== '') app.populateTable()
  app.setClearCompleted()
  app.updateCount()
}

app.TodoListOperations.setToggle = function () {
  document.getElementById('toggle-all').checked = !!(app.allTodos.every((todo) => todo.status.checked === true))
}

app.TodoListOperations.initiateList = () => {
  app.api.readTasks()
    .then(function (response) {
      return response.json()
    })
    .then((response) => {
      response.forEach(({id, description, status}) => {
        app.TodoListOperations.insertIntoList(id, description, status)
      })
      app.updateLists()
      app.TodoListOperations.addEvents()
      app.TodoListOperations.setToggle()
      app.updateHiddenDivisions()
    })
    .catch(function (err) {
      console.log(err)
    })
}

app.TodoListOperations.insertNewTask = function () {
  let description = document.getElementById('task-text').value
  description = app.escapeHtml(description)
  // Escape HTML
  app.api.insertTask(description)
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      document.getElementById('task-text').value = ''
      const todo = app.TodoListOperations.insertIntoList(response[0].id, description, false)
      app.TodoListOperations.addTodoItemEvents(todo)
      app.TodoListOperations.setToggle()
      app.updateLists()
      app.updateHiddenDivisions()
    })
    .catch(function (err) {
      console.log(err)
    })
}

app.TodoListOperations.addEvents = function () {
  app.TodoListOperations.addGlobalEvents()
  app.allTodos.forEach((item) => {
    app.TodoListOperations.addTodoItemEvents(item)
  })
}

app.TodoListOperations.addGlobalEvents = function () {
  // Insert Task
  document.getElementById('task-text').addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      app.TodoListOperations.insertNewTask()
    }
  })
  // Update all
  document.getElementById('toggle-all').addEventListener('change', (e) => {
    const status = e.target.checked
    app.api.updateAll(status)
      .then(() => {
        app.TodoListOperations.toggleListStatus(status)
      })
      .catch(() => {
        console.log('Error connecting to server')
      })
  })
  // Clear Completed
  document.getElementById('clear-completed').addEventListener('click', (e) => {
    app.api.deleteCompleted(status)
      .then(() => {
        app.TodoListOperations.deleteCompletedFromList()
        app.TodoListOperations.setToggle()
      })
      .catch(function (err) {
        console.log(err)
      })
  })
}

app.TodoListOperations.addTodoItemEvents = function (item) {
  // Delete Task
  item.removeButton.addEventListener('click', (e) => {
    item.onDelete()
      .then(() => {
        app.TodoListOperations.deleteItemFromList(item)
        app.TodoListOperations.setToggle()
        // app.removeChild(item.element)
      })
      .catch((error) => {
        console.log(error)
      })
  })
  // DoubleClick
  item.task.addEventListener('dblclick', () => {
    item.onDoubleClick()
  })
  // Blur
  item.task.addEventListener('blur', () => {
    item.onBlur()
  })

  item.task.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      item.onBlur()
    }
  })
  // CheckBox
  item.status.addEventListener('change', () => {
    item.onCheck()
  })
}
