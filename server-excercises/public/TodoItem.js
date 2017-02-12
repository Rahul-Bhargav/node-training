class TodoItem {
  constructor (id, description, status) {
    this.createRowItems(id, description, status)
  }

  onDoubleClick () {
    this.task.readOnly = false
    this._unSavedDescription = this.task.value
    // set task style to have different font or the input box to have a border
  }

  onBlur () {
    let task = app.escapeHtml(this.task.value)
    app.api.updateTask(this.element.id, task, this.status.checked)
      .then(() => {
        this._unSavedDescription = task
        this.task.value = task
        this.task.readOnly = true
      })
      .catch(() => {
        alert('Error:could not update')
        this.task.value = this._unSavedDescription
      })
  }

  onCheck () {
    app.api.updateTask(this.element.id, this.task.value, this.status.checked)
      .then(() => {
        this._unSavedStatus = this.status.checked
        app.TodoListOperations.setToggle()
        app.updateLists()
      })
      .catch(() => {
        alert('Error:could not update')
        this.status.checked = this._unSavedStatus
      })
  }

  onDelete () {
    return app.api.deleteTask(this.element.id)
  }

  createRowItems (id, description, status) {
    this.element = document.createElement('tr')
    this.element.setAttribute('id', id)

    const statusData = document.createElement('td')
    this.status = document.createElement('input')
    this.status.setAttribute('type', 'checkbox')
    this.status.setAttribute('name', 'staus')
    this.status.checked = status
    this._unSavedStatus = status
    statusData.appendChild(this.status)

    const taskData = document.createElement('td')
    this.task = document.createElement('input')
    this.task.setAttribute('type', 'text')
    this.task.setAttribute('name', 'description')
    this.task.setAttribute('value', description)
    this.task.setAttribute('readonly', true)
    this._unSavedDescription = description
    taskData.appendChild(this.task)

    const removeData = document.createElement('td')
    this.removeButton = document.createElement('input')
    this.removeButton.setAttribute('type', 'button')
    this.removeButton.setAttribute('name', 'remove')
    this.removeButton.setAttribute('value', '❌')
    removeData.appendChild(this.removeButton)

    this.element.appendChild(statusData)
    this.element.appendChild(taskData)
    this.element.appendChild(removeData)
  }
}
