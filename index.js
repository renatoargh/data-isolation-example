const express = require('express')
const sequelizeMiddleware = require('./middlewares/sequelize')
const authMiddleware = require('./middlewares/auth')

const app = express()
app.use(sequelizeMiddleware())
app.use(authMiddleware)

app.get('/tasks', async (req, res, next) => {
  const { user } = req
  const { Task, TaskType } = req.models

  try {
    const tasks = await Task.findAll({
      where: { userId: user.id },
      include: {
        model: TaskType,
        as: 'taskType'
      }
    })

    res.json(tasks)
  } catch (err) {
    next(err)
  }
})

app.listen(9090, () => {
  console.log('data-isolation-example running on port 9090')
})
