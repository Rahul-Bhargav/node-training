const Sequelize = require('Sequelize')

const dbName = process.env.DEV_MODE === 'test' ? 'testdb' : 'Excercise'

const sequelize = new Sequelize('postgres://rahulsurabhi:rah1161!@localhost:5432/' + dbName)

const databaseOprations = {
  insert: function (descriptionInput) {
    return sequelize.query(`INSERT INTO TASKS (DESCRIPTION) VALUES (:description) RETURNING ID`, { replacements: { description: descriptionInput }, type: sequelize.QueryTypes.SELECT })
  },
  read: function () {
    return sequelize.query(`SELECT ID,DESCRIPTION,STATUS FROM TASKS ORDER BY ID ASC`, { replacements: {}, type: sequelize.QueryTypes.SELECT })
  },
  update: function (descriptionInput, idInput, statusInput) {
    if (!descriptionInput) {
      return sequelize.query(`UPDATE TASKS SET STATUS = :status WHERE ID = :id`, { replacements: { status: statusInput, id: idInput }, type: sequelize.QueryTypes.UPDATE })
    }
    if (statusInput === null || statusInput === undefined) {
      return sequelize.query(`UPDATE TASKS SET DESCRIPTION = :description WHERE ID = :id`, { replacements: { description: descriptionInput, id: idInput }, type: sequelize.QueryTypes.UPDATE })
    }
    return sequelize.query(`UPDATE TASKS SET DESCRIPTION = :description, STATUS = :status WHERE ID = :id`, { replacements: { status: statusInput, description: descriptionInput, id: idInput }, type: sequelize.QueryTypes.UPDATE })
  },
  updateAll: function (status) {
    return sequelize.query(`UPDATE TASKS SET STATUS=:status`, { replacements: { status: status }, type: sequelize.QueryTypes.UPDATE })
  },
  destroy: function (idInput) {
    return sequelize.query(`DELETE FROM TASKS WHERE ID=:id`, { replacements: { id: idInput }, type: sequelize.QueryTypes.DELETE })
  },
  destroyCompleted: function (idInput) {
    return sequelize.query(`DELETE FROM TASKS WHERE STATUS=true`, { type: sequelize.QueryTypes.DELETE })
  }
}

module.exports = databaseOprations
