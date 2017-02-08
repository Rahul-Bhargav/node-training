/* eslint-disable */
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

let idMap = []

function escapeHtml(string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s]
  })
}

function mapTasks(tasks) {
  idMap = tasks.map((task) => {
    return task.id
  })
}

function getTasks() {
  return fetch('/read', { method: 'get' })
    .then(function (response) {
      return response.json()
    })
    .then((tasks) => {
      const listElement = document.getElementById('taskTable')
      listElement.innerHTML = ``
      mapTasks(tasks)
      tasks.forEach((task, index) => {
        const escapedDescription = escapeHtml(task.description)
        const checked = task.status ? "checked" : ""
        listElement.innerHTML += `
        <tr>
         <td><input type="checkbox" id="${task.id}-status" value="${task.status}" onchange="updateStatus(${task.id},this.value)" ${checked}></td>
        <td>${escapedDescription}</td>
        <td><input type="button" id="${task.id}" value="delete" onclick="deleteTask(this.id)"></td>
        </tr>` // XSS
        return true
      })
    })
    .catch(function (err) {
      console.log(err)
    })
}

function writeTask() {
  const description = document.getElementById('description').value
  const escapedDescription = escapeHtml(description)
  fetch(`/write/${escapedDescription}`, { method: 'post' })
    .then(function (response) {
      return getTasks()
    })
    .catch(function (err) {
      console.log(err)
    })
}

function deleteTask(id) {
  if (isNaN(id)) {
    alert('Invalid ID' + id)
    return
  }
  fetch(`/destroy/${id}`, { method: 'delete' })
    .then(function (response) {
      return getTasks()
    })
    .catch(function (err) {
      console.log(err)
    })
}

function updateStatus(id, status) {
  if (isNaN(id)) {
    alert('Invalid ID')
    return
  }
  status = (status === 'false') ? true : false;
  data = {
    status: status
  }
  fetch(`/update/${id}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(function (response) {
      return getTasks()
    })
    .catch(function (err) {
      console.log(err)
    })
}

function updateTask() {
  let id = document.getElementById('updateLine').value
  const task = document.getElementById('updateDescription').value
  if (isNaN(id)) {
    alert('Invalid ID')
    return
  }
  data = {
    task: task,
  }
  id = idMap[id-1]
  fetch(`/update/${id}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(function (response) {
      return getTasks()
    })
    .catch(function (err) {
      console.log(err)
    })
}