const path = require('path')
const fs = require('fs')
const Sequelize = require('sequelize')

const { CONNECTION_STRING } = process.env
const modelsFolder = path.join(__dirname, '../models')
const models = {}

module.exports = () => {
  const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'mssql',
    dialectOptions: { encrypt: true }
  })

  fs.readdirSync(modelsFolder).forEach(modelPath => {
    modelPath = path.join(modelsFolder, modelPath)

    let model = require(modelPath)
    model = sequelize.import(modelPath, model)
    model = model.applySchema('shared')
    models[model.name] = model
  })

  Object.values(models)
        .filter(m => m.associate)
        .forEach(m => m.associate(models))

  return (req, res, next) => {
    req.models = models
    req.applySchema = schema => {
      Object.keys(req.models)
            .forEach(modelName => {
              const model = req.models[modelName]
              req.models[modelName] = model.applySchema(schema)
            })
    }

    next()
  }
}
