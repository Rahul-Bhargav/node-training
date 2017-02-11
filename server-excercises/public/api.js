app.api = {
  readTasks: function () {
    return fetch('/read', { method: 'get' })
      .then(function (response) {
        return response.json()
      })
      .catch(function (err) {
        console.log(err)
      })
  },

  updateTask: function (id, status, description) {
    const data = {
      status: status,
      description: description
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
    fetch(`/destroy/${id}`, { method: 'delete' })
      .catch(function (err) {
        console.log(err)
      })
  }
}

