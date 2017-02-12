app.api = {
  readTasks: function () {
    return fetch('/read', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        return response.json()
      })
      .catch(function (err) {
        console.log(err)
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
      .then((response) => {
        return response.json()
      })
      .catch(function (err) {
        console.log(err)
      })
  },

  deleteTask: function (id) {
    return fetch(`/destroy/${id}`, { method: 'delete' })
      .catch(function (err) {
        console.log(err)
      })
  },

  deleteCompleted: function () {
    return fetch(`/destroycompleted`, { method: 'delete' })
      .catch(function (err) {
        console.log(err)
      })
  }
}

