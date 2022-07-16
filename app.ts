import { INIT_USER_DATA } from './app/contents/index'
import { Application } from 'egg'
import { INIT_TYPE_DATA } from './app/contents'

module.exports = (app: Application) => {
  app.beforeStart(async function () {
    // 在启动前创建 sql 表
    // force: true 将创建表，如果它已经存在则首先删除它
    // alter: true 这会检查数据库中表的当前状态 然后在表中执行必要的更改以使其与模型匹配
    // async() 如果表不存在，则创建表（如果已经存在，则不执行任何操作)
    await app.model.sync({ force: true })
    // 初始化type 表格信息
    await app.model.Type.bulkCreate(INIT_TYPE_DATA)
    await app.model.User.create(INIT_USER_DATA)
  })
}
