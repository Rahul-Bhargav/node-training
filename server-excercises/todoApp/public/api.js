app.api = {
  readTasks: function () {
    return fetch('/read', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  },

  updateAll: function (status) {
    const data = {
      status: status
    }
    return fetch(`/updateall`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .catch(function (err) {
        console.log(err)
      })
  },

  updateTask: function (id, description, status) {
    const data = {
      status: status,
      task: description
    }
    return fetch(`/update/${id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .catch(function (err) {
        console.log(err)
      })
  },

  insertTask: function (description) {
    return fetch(`/write/${description}`, { method: 'post' })
  },

  deleteTask: function (id) {
    return fetch(`/destroy/${id}`, { method: 'delete' })
  },

  deleteCompleted: function () {
    return fetch(`/destroycompleted`, { method: 'delete' })
  }
}

