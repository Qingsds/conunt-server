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
    .post('/api/bill/add', _jwt, billValidator, controller.bill.addBill)
}
