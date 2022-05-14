import { Application } from 'egg'

module.exports = (app: Application) => {
  const { DataTypes } = app.Sequelize

  const Bill = app.model.define('bill', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pay_type: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: 'true为收入,false为支出',
    },
    amount: {
      type: DataTypes.INTEGER,
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

  return Bill
}
