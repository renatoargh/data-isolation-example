module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      field: 'Id'
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'Email'
    },

    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'Password'
    },

    dedicatedSchema: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'DedicatedSchema'
    }
  }, {
    freezeTableName: true,
    tableName: 'Users',
    createdAt: false,
    updatedAt: false,
    classMethods: {
      applySchema: () => User.schema('shared')
    }
  })

  return User
}
