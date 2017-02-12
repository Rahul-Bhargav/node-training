const Sequelize = require('Sequelize')

const sequelize = new Sequelize('postgres://rahulsurabhi:rah1161!@localhost:5432/Excercise')

sequelize.query(`SELECT ID,DESCRIPTION,STATUS FROM TASKS`)
.then(function (Tasks) {
  console.log(Tasks)
})

