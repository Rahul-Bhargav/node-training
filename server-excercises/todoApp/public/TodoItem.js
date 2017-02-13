class TodoItem {
  constructor (id, description, status) {
    this.createRowItems(id, description, status)
  }

  onDoubleClick () {
    this.task.readOnly = false
    this._unSavedDescription = this.task.value
    this.task.setAttribute('class', 'edit')
    // set task style to have different font or the input box to have a border
  }

  onBlur () {
    let task = app.escapeHtml(this.task.value)
    app.api.updateTask(this.element.id, task, this.status.checked)
      .then(() => {
        this._unSavedDescription = task
        this.task.value = task
        this.task.readOnly = true
        if (this.status.checked) this.task.setAttribute('class', 'read-only-completed')
        else this.task.setAttribute('class', 'read-only')
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
        if (this.status.checked) this.task.setAttribute('class', 'read-only-completed')
        else this.task.setAttribute('class', 'read-only')
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
    this.element = document.createElement('li')
    this.element.setAttribute('id', id)
    const divisionElement = document.createElement('div')
    divisionElement.setAttribute('class', 'view')

    this.status = document.createElement('input')
    this.status.setAttribute('type', 'checkbox')
    this.status.setAttribute('name', 'status')
    this.status.setAttribute('class', 'toggle')
    this.status.checked = status
    this._unSavedStatus = status

    this.task = document.createElement('input')
    this.task.setAttribute('type', 'text')
    this.task.setAttribute('name', 'description')
    this.task.setAttribute('class', 'read-only')
    this.task.setAttribute('value', description)
    this.task.setAttribute('readonly', true)
    this._unSavedDescription = description

    this.removeButton = document.createElement('button')
    this.removeButton.setAttribute('name', 'remove')
    this.removeButton.setAttribute('class', 'destroy')

    divisionElement.appendChild(this.status)
    divisionElement.appendChild(this.task)
    divisionElement.appendChild(this.removeButton)
    this.element.appendChild(divisionElement)
  }
}
