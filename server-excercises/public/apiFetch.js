/* eslint-disable */
document.getElementById("taskInput")
  .addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode == 13) {
      writeTask()
    }
  });

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
//TODO: use modular DOM functions for add task update task delete task
function getTaskHTML(task) {
  const escapedDescription = escapeHtml(task.description)
  const checked = task.status ? "checked" : ""
  let htmlContent = `
        <tr>
         <td class="statusColoumn"><input type="checkbox" id="${task.id}-status" value="${task.status}" onchange="updateStatus(${task.id},this.value)" ${checked}></td>
        <td class="dataColoumn"><input type="text" value="${escapedDescription}" id="${task.id}-desc" onfocusout="updateTask(${task.id})"></td>
        <td class="deleteColoumn"><input type="button" id="${task.id}" value="delete" onclick="deleteTask(this.id)"></td>
        </tr>`
  return htmlContent
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
        listElement.innerHTML += getTaskHTML(task)// XSS
        return true
      })
    })
    .catch(function (err) {
      console.log(err)
    })
}

function writeTask() {
  const description = document.getElementById('taskInput').value
  document.getElementById("taskInput").value = ''
  const escapedDescription = escapeHtml(description)
  fetch(`/write/${escapedDescription}`, { method: 'post' })
    .then(() => {
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
    .then(() => {
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
    .catch(function (err) {
      console.log(err)
    })
}

function updateTask(id) {
  const task = document.getElementById(`${id}-desc`).value
  if (isNaN(id)) {
    alert('Invalid ID')
    return
  }
  data = {
    task: task,
  }
  fetch(`/update/${id}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
    .catch(function (err) {
      console.log(err)
    })
}