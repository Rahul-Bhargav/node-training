app.TodoListOperations.deleteItemFromList = function (todo) {
  app.allTodos = app.allTodos.filter((item) => item.element.id !== todo.element.id)
  app.updateLists()
}

app.TodoListOperations.deleteCompletedFromList = function () {
  app.allTodos.forEach((todo, index) => {
    if (todo.status.checked) {
      app.allTodos.splice(index, 1)
      app.removeChild(todo.element)
    }
  })
  app.updateLists()
}

app.TodoListOperations.insertIntoList = function (id, description, status) {
  const todo = new TodoItem(id, description, status)
  app.allTodos.push(todo)
  return todo
}

app.TodoListOperations.toggleListStatus = function (status) {
  app.allTodos.forEach((todo) => {
    todo.status.checked = status
  })
  app.updateLists()
}

app.TodoListOperations.setToggle = function () {
  document.getElementById('toggle-all').checked = !!(app.allTodos.every((todo) => todo.status.checked === true))
}

app.TodoListOperations.initiateList = () => {
  app.api.readTasks()
    .then((response) => {
      response.forEach(({id, description, status}) => {
        app.TodoListOperations.insertIntoList(id, description, status)
      })
      app.updateLists()
      app.TodoListOperations.addEvents()
      app.TodoListOperations.setToggle()
    })
}

app.TodoListOperations.insertNewTask = function () {
  let description = document.getElementById('task-text').value
  description = app.escapeHtml(description)
  app.api.insertTask(description)    // Escape HTML
    .then((response) => {
      document.getElementById('task-text').value = ''
      const todo = app.TodoListOperations.insertIntoList(response[0].id, description, false)
      app.TodoListOperations.addTodoItemEvents(todo)
      app.appendChild(todo.element)
      app.TodoListOperations.setToggle()
      app.updateLists()
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
  document.getElementById('insert-task').addEventListener('click', (e) => {
    app.TodoListOperations.insertNewTask()
  })
  // Update all
  document.getElementById('toggle-all').addEventListener('change', (e) => {
    const status = e.target.checked
    app.api.updateAll(status)
      .then(() => {
        app.TodoListOperations.toggleListStatus(status)
      })
  })
  // Clear Completed
  document.getElementById('clear-completed').addEventListener('click', (e) => {
    app.api.deleteCompleted(status)
      .then(() => {
        app.TodoListOperations.deleteCompletedFromList()
        app.TodoListOperations.setToggle()
      })
  })
  // Display all Tasks
  document.getElementById('select-all').addEventListener('click', (e) => {
    location.hash = '/all'
  })
  // Display Active Tasks
  document.getElementById('select-active').addEventListener('click', (e) => {
    location.hash = '/active'
  })
  // Display Completed Tasks
  document.getElementById('select-completed').addEventListener('click', (e) => {
    location.hash = '/completed'
  })
}

app.TodoListOperations.addTodoItemEvents = function (item) {
  // Delete Task
  item.removeButton.addEventListener('click', (e) => {
    item.onDelete()
      .then(() => {
        app.TodoListOperations.deleteItemFromList(item)
        app.TodoListOperations.setToggle()
        app.removeChild(item.element)
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
  // CheckBox
  item.status.addEventListener('change', () => {
    item.onCheck()
  })
}
