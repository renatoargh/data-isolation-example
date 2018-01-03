module.exports = (sequelize, DataTypes) => {
  const TaskType = sequelize.define('TaskType', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'Id'
    },

    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'Description'
    }
  }, {
    freezeTableName: true,
    tableName: 'TaskTypes',
    createdAt: false,
    updatedAt: false,
    classMethods: {
      applySchema: () => TaskType.schema('shared')
    }
  })

  return TaskType
}
