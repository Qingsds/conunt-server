module.exports = app => {
  const { DataTypes } = app.Sequelize

  const Type = app.model.define('type', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '1为支出, 2为收入',
    },
    user_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment:
        '默认值 0 所有人可见 某个用户单独设置的标签,user_id 就是该用户的用户 id',
    },
  })

  Type.associate = function () {
    Type.hasMany(app.model.Bill)
  }

  return Type
}
