/* eslint-disable*/
document.getElementById('taskInput')
  .addEventListener('keyup', function (event) {
    event.preventDefault()
    if (event.keyCode === 13) {
      writeTask()
    }
  })

const entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
}

function escapeHtml(string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s]
  })
}

function getTaskRow(task) {
  const escapedDescription = escapeHtml(task.description)
  const checked = task.status ? 'checked' : ''
  let htmlContent = `
        <tr id=${task.id}>
          <td class="statusColoumn">
            <input type="checkbox" id="${task.id}-status" value="${task.status}" onchange="updateStatus(${task.id})" ${checked}></td>
          <td class="dataColoumn">
            <input type="text" value="${escapedDescription}" id="${task.id}-desc" onfocusout="updateTask(${task.id})">
          </td>
          <td class="deleteColoumn">
            <input type="button" id="${task.id}-delete" value="delete" onclick="deleteTask(${task.id})">
          </td>
        </tr>`
  return htmlContent
}

function updateTaskView(id, description, status) {
  const taskDescription = document.getElementById(`${id}-desc`)
  const taskStatus = document.getElementById(`${id}-status`)
  if (description){ 
    taskDescription.value = description; 
  }
  if (status){ 
    taskStatus.value = status; 
  }
}

function appendTaskView(task) {
  const taskTable = document.getElementById('taskTable')
  taskTable.innerHTML += getTaskRow(task)
}

function deleteTaskView(id) {
  const task = document.getElementById(id)
  task.parentNode.removeChild(task)
}

function populateList(tasks) {
  const taskTable = document.getElementById('taskTable')
  tasks.forEach((task) => {
    taskTable.innerHTML += getTaskRow(task)
  })
}
// TODO: strike through
// TODO: update and response
// TODO: use modular DOM functions for add task update task delete task

function readTasks() {
  return fetch('/read', { method: 'get' })
    .then(function (response) {
      return response.json()
    })
    .then((tasks) => {
      populateList(tasks)
    })
    .catch(function (err) {
      console.log(err)
    })
}

function writeTask() {
  const description = document.getElementById('taskInput').value
  document.getElementById('taskInput').value = ''
  description.trim()
  if (!description || description === '') {
    return
  }
  const escapedDescription = escapeHtml(description)
  fetch(`/write/${escapedDescription}`, { method: 'post' })
    .then((response) => {
      return response.json()
    })
    .then((taskID) => {
      const task = { id: taskID[0].id, description: escapedDescription, status: false }
      appendTaskView(task);
    })
    .catch(function (err) {
      console.log(err)
    })
}

function deleteTask(id) {
  fetch(`/destroy/${id}`, { method: 'delete' })
    .then(() => {
      deleteTaskView(id)
    })
    .catch(function (err) {
      console.log(err)
    })
}

function updateStatus(id) {
  statusElement = document.getElementById(`${id}-status`).value
  let status = statusElement.value
  status = (status === 'false')? true:false
  data = {
    status: status
  }
  fetch(`/update/${id}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(() => {
      updateTaskView(id, null, status)
    })
    .catch(function (err) {
      console.log(err)
    })
}

function updateTask(id) {
  const description = document.getElementById(`${id}-desc`).value
  data = {
    task: description
  }
  fetch(`/update/${id}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(() => {
      updateTaskView(id, description, null)
    })
    .catch(function (err) {
      console.log(err)
    })
}
