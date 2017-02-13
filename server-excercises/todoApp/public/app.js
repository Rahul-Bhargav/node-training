const app = {}
app.TodoList = []
app.allTodos = []
app.CompletedTodos = []
app.ActiveTodos = []
app.TodoListOperations = {}

app.entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
}

app.escapeHtml = function (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return app.entityMap[s]
  })
}

app.ListTypes = {
  '': () => app.allTodos,
  'all': () => app.allTodos,
  'active': () => app.ActiveTodos,
  'completed': () => app.CompletedTodos
}

const onLoad = () => {
  app.TodoListOperations.initiateList()
}

app.updateLists = function () {
  app.CompletedTodos = app.allTodos.filter((todo) => todo.status.checked === true)
  app.ActiveTodos = app.allTodos.filter((todo) => todo.status.checked === false)
  app.setView()
  app.populateTable()
  app.setClearCompleted()
  app.updateCount()
}

// app.setCurrentList = function (type) {
//   app.TodoList = app.ListTypes.type
// }

app.setView = function () {
  const route = location.hash.split('/')[1]
  var page = route || ''
  app.TodoList = app.ListTypes[page]()
}

app.populateTable = function () {
  const table = document.getElementById('task-table')
  while (table.hasChildNodes()) {
    table.removeChild(table.lastChild)
  }
  app.TodoList.forEach(item => table.appendChild(item.element))
}

app.onHashChange = function () {
  app.updateLists()
  app.populateTable()
}

app.setClearCompleted = function () {
  const toggle = app.allTodos.some((todo) => todo.status.checked)
  document.getElementById('clear-completed').parentElement.setAttribute('class', (toggle) ? 'clear-completed-show' : 'clear-completed-hidden')
}

app.updateCount = function () {
  const paragraphElement = document.getElementById('task-count')
  const itemsLeft = app.CompletedTodos.length
  paragraphElement.innerHTML = (itemsLeft === 1) ? `1 item left` : `${itemsLeft} items left`
}

app.appendChild = function (item) {
  const table = document.getElementById('task-table')
  table.appendChild(item)
}

window.addEventListener('hashchange', app.onHashChange)

app.removeChild = function (item) {
  const table = document.getElementById('task-table')
  table.removeChild(item)
}
