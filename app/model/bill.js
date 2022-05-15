module.exports = app => {
  const { DataTypes } = app.Sequelize

  const Bill = app.model.define('bill', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pay_type: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '1为支出, 2为收入',
    },
    amount: {
      type: DataTypes.STRING,
      comment: '消费金额(账单)',
    },
    date: {
      type: DataTypes.DATE,
      comment: '账单日期',
    },
    type_id: {
      type: DataTypes.INTEGER,
      comment: '账单标签 id',
    },
    type_name: {
      type: DataTypes.STRING,
      comment: '标签名',
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    remark: {
      type: DataTypes.STRING,
    },
  })
  Bill.associate = function () {
    Bill.belongsTo(app.model.User, { foreignKey: 'user_id' })
    Bill.belongsTo(app.model.Type, { foreignKey: 'type_id' })
  }
  return Bill
}
