app.TodoListOperations.refreshList = () => {
  const table = document.getElementById('taskTable')
  app.TodoList.forEach(item => table.appendChild(item.element))
}

app.TodoListOperations
app.TodoListOperations.deleteItemFromList = function (todo) {
  const table = document.getElementById('taskTable')
  app.TodoList = app.TodoList.filter((item) => item.element.id !== todo.element.id)
  table.removeChild(todo.element)
}

app.TodoListOperations.insertIntoList = function (id, description, status) {
  const todo = new TodoItem(id, description, status)
  app.TodoList.push(todo)
  const table = document.getElementById('taskTable')
  table.appendChild(todo.element)
}

app.TodoListOperations.initiateList = () => {
  app.api.readTasks()
    .then((response) => {
      response.forEach(({id, description, status}) => {
        app.TodoListOperations.insertIntoList(id, description, status)
      })
      app.TodoListOperations.refreshList()
      app.TodoListOperations.addEvents()
    })
}

app.TodoListOperations.addEvents = function () {
  // Insert Task
  document.getElementById('insertTask').addEventListener('click', (e) => {
    const description = document.getElementById('taskToInsert').value
    app.api.insertTask(description)    // Escape HTML
      .then((response) => {
        app.TodoListOperations.insertIntoList(response[0].id, description, false)
      })
  })
  // Delete Task
  app.TodoList.forEach((item) => {
    item.removeButton.addEventListener('click', (e) => {
      item.onDelete()
        .then(() => {
          app.TodoListOperations.deleteItemFromList(item)
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
    item.status.addEventListener('check', () => {
      console.log()
      item.onCheck()
    })
  })
}
