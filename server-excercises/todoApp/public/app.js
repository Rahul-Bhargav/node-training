const app = {}
app.todoList = []
app.allTodos = []
app.completedTodos = []
app.activeTodos = []
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

app.listTypes = {
  '': () => app.allTodos,
  'active': () => app.activeTodos,
  'completed': () => app.completedTodos
}

const onLoad = () => {
  app.TodoListOperations.initiateList()
}

app.updateLists = function () {
  app.completedTodos = app.allTodos.filter((todo) => todo.status.checked === true)
  app.activeTodos = app.allTodos.filter((todo) => todo.status.checked === false)
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
  document.querySelector('.filters .selected').className = ''
  document.querySelector('.filters [href="#/' + page + '"]').className = 'selected'
  app.todoList = app.listTypes[page]()
}

app.populateTable = function () {
  const table = document.getElementById('todo-list')
  while (table.hasChildNodes()) {
    table.removeChild(table.lastChild)
  }
  app.todoList.forEach(item => table.appendChild(item.element))
}

app.onHashChange = function () {
  app.updateLists()
  app.populateTable()
}

app.setClearCompleted = function () {
  const toggle = app.allTodos.some((todo) => todo.status.checked)
  document.getElementById('clear-completed').setAttribute('class', (toggle) ? 'clear-completed-show' : 'clear-completed-hidden')
}

app.updateCount = function () {
  const paragraphElement = document.getElementById('todo-count')
  const itemsLeft = app.allTodos.length - app.completedTodos.length
  paragraphElement.innerHTML = (itemsLeft === 1) ? `1 item left` : `${itemsLeft} items left`
}

app.appendChild = function (item) {
  const table = document.getElementById('todo-list')
  table.appendChild(item)
}

window.addEventListener('hashchange', app.onHashChange)

app.removeChild = function (item) {
  const table = document.getElementById('todo-list')
  table.removeChild(item)
}

app.updateHiddenDivisions = function () {
  const toggleAll = document.getElementById('toggle-all')
  const footerDiv = document.getElementById('todoapp-footer')
  toggleAll.style.display = (app.allTodos.length >= 1) ? 'block' : 'none'
  footerDiv.style.display = (app.allTodos.length >= 1) ? 'block' : 'none'
}
