import { Application } from 'egg'

module.exports = (app: Application) => {
  const { DataTypes } = app.Sequelize

  const User = app.model.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '用户名',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'password',
    },
    signature: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  })

  return User
}
