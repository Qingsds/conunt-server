/**
 * @description router
 * @author qingsds
 */
import { Application } from 'egg'
import jtwErr from './middlewares/jtwErr'
import generateValidator from './middlewares/validator'
import billValidate from './validator/bill'
import userValidate from './validator/user'

export default (app: Application) => {
  const { controller, router } = app
  const _jwt = jtwErr(app.config.jwt.secret)
  const userValidator = generateValidator(userValidate)
  const billValidator = generateValidator(billValidate)

  router
    .post('/api/user/register', controller.user.register)
    .post('/api/user/login', controller.user.login)
    .post('/api/upload', _jwt, controller.upload.upload)
    .get('/api/user/user_info', _jwt, controller.user.getUserInfo) //获取用户信息
    .post(
      '/api/user/edit_user_info',
      _jwt,
      userValidator,
      controller.user.editUserInfo
    ) //修改用户信息
    .post('/api/user/modify_password', _jwt, controller.user.modifyUserPassword) //修改用户密码
    .post('/api/bill/add', _jwt, billValidator, controller.bill.add) //添加账单
    .get('/api/type/list', _jwt, controller.type.list)
    .post('/api/type/delete', _jwt, controller.type.delete)
    .post('/api/type/add', _jwt, controller.type.add)
    .post('/api/type/update', _jwt, controller.type.update)
    .get('/api/bill/list', _jwt, controller.bill.list)
    .post('/api/bill/add', _jwt, controller.bill.add)
    .get('/api/bill/detail', _jwt, controller.bill.detail)
    .post('/api/bill/delete', _jwt, controller.bill.delete)
    .post('/api/bill/update', _jwt, controller.bill.update)
    .get('/api/bill/data', _jwt, controller.bill.data)
}
