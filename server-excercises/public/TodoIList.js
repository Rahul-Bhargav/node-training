app.TodoList = []

const TodoListOperations = {}

TodoListOperations.renderList = (list) => {
  const table = document.getElementById('taskTable')
  list.forEach(item => table.appendChild(item))
  return table
}

TodoListOperations.deleteItemFromList = function (list, dId) {
  return list.filter(({id}) => id !== dId)
}

TodoListOperations.insertIntoList = function (list, id, description) {

}


TodoListOperations.addEvents = function (list) {
  document.getElementById('insertTask').addEventListener('click', (e) => {
    const description = document.getElementById('taskToInsert') 
    // Escape HTML
    app.api.insertTask(description)
    .then((response) => {
      TodoListOperations(list, response[0].id, description)
    })
  })
  list.forEach((item) => {
    item.remove.addEventListner('click', (e) => {
      item.onDelete()
      .then(() => {
        list = TodoListOperations.deleteItemFromList(list, item.element.id)
      })
      .catch((error) => {
        console.log(error)
      })
    })

    item.task.addEventListner('dblclick', () => {
      item.onDoubleClick()
    })

    item.task.addEventListner('blur', () => {
      item.onBlur()
    })

    item.status.addEventListner('check', () => {
      item.onCheck()
    })
  })
}
