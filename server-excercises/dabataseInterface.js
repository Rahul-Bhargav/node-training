const Sequelize = require('Sequelize')

const sequelize = new Sequelize('postgres://rahulsurabhi:rah1161!@localhost:5432/Excercise')

const databaseOprations = {
  insert: function (descriptionInput) {
    return sequelize.query(`INSERT INTO TASKS (DESCRIPTION) VALUES (:description)`, { replacements: {description: descriptionInput}, type: sequelize.QueryTypes.SELECT })
  },
  read: function () {
    return sequelize.query(`SELECT ID,DESCRIPTION,STATUS FROM TASKS ORDER BY ID ASC`)
  },
  update: function (descriptionInput, idInput, statusInput) {
    if (!descriptionInput) {
      return sequelize.query(`UPDATE TASKS SET STATUS = :status WHERE ID = :id`, { replacements: {status: statusInput, id: idInput}, type: sequelize.QueryTypes.SELECT })
    }
    if (!statusInput) {
      return sequelize.query(`UPDATE TASKS SET DESCRIPTION = :description WHERE ID = :id`, { replacements: {description: descriptionInput, id: idInput}, type: sequelize.QueryTypes.SELECT })
    }
    return sequelize.query(`UPDATE TASKS SET DESCRIPTION = :description, STATUS = :status WHERE ID = :id`, { replacements: {status: statusInput, description: descriptionInput, id: idInput}, type: sequelize.QueryTypes.SELECT })
  },
  destroy: function (idInput) {
    return sequelize.query(`DELETE FROM TASKS WHERE ID=:id`, { replacements: {id: idInput}, type: sequelize.QueryTypes.SELECT })
  }
}

module.exports = databaseOprations
