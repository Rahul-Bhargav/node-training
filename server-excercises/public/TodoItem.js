class TodoItem {
  constructor (id, description, status, parentList) {
    this.parentList = parentList
    this.createRowItems(id, description, status)
    this.addEvents()
  }

  onDoubleClick () {
    this.task.readOnly = false
    this._unSavedDescription = this.task.value
    // set task style to have different font or the input box to have a border
  }

  onBlur () {
    this.task.readOnly = true
    app.api.updateStatus(this.element.id, this.task.value, this.status.checked)
      .then(() => {
        this._unSavedDescription = this.task.value
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
      })
      .catch(() => {
        this.status.checked = this._unSavedStatus
      })
  }

  onDelete () {
    return app.api.deleteTask(this.id)
  }

  createRowItems (id, status, description) {
    this.element = document.createElement('tr')
    this.element.setAttribute('id', id)

    const statusData = document.createElement('td')
    this.status = document.createElement('input')
    this.status.setAttribute('type', 'checkbox')
    this.status.setAttribute('name', 'staus')
    this.status.setAttribute('checked', status)
    this._unSavedStatus = status
    statusData.appendChild(this.status)

    const taskData = document.createElement('td')
    this.task = document.createElement('input')
    this.task.setAttribute('type', 'text')
    this.task.setAttribute('name', 'description')
    this.task.setAttribute('value', description)
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
