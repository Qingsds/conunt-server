/**
 * @description user controller
 * @author qingsds
 */
import { Controller } from 'egg'
import { DEFAULT_PIC, DEFAULT_SIG } from '../contents'
import errorInfo from '../resModel/error-info'
import resModel from '../resModel/res-model'
import { doCrypto } from '../utils/bcrypt'

const { ErrorModal, SuccessModel } = resModel

export function _getExpTime(time: number) {
  return Math.floor(Date.now() / 1000) + time
}
class UserController extends Controller {
  /**
   * 用户注册
   * @returns
   */
  public async register() {
    const { ctx } = this
    const { username, password } = ctx.request.body
    const userInfo = await ctx.service.user.getUser(username)
    // 若已经有该用户信息, 则直接返回注册失败
    if (userInfo && userInfo.username) {
      ctx.body = new ErrorModal(errorInfo.registerUserNameIsExistInfo)
      return
    }
    // 注册
    try {
      await ctx.service.user.createUser(username, doCrypto(password))
      ctx.body = new SuccessModel()
    } catch (error) {
      console.error((error as Error).message)
      ctx.body = new ErrorModal({ errno: 1000001, message: 'some error' })
    }
  }

  /**
   * 用户登录
   */
  public async login() {
    const { ctx, app } = this
    const { username, password } = ctx.request.body

    const userInfo = await ctx.service.user.getUser(
      username,
      doCrypto(password)
    )
    if (!userInfo) {
      ctx.body = new ErrorModal(errorInfo.loginFailInfo)
      return
    }

    // token
    const token = app.jwt.sign(
      {
        id: userInfo.id,
        username: userInfo.username,
        exp: _getExpTime(60 * 60 * 24 * 30),
      },
      app.config.jwt.secret
    )
    ctx.body = new SuccessModel({ token })
  }

  /**
   * 获取用户信息
   */
  public async getUserInfo() {
    const { ctx } = this
    const { username } = ctx.decode
    const userInfo = await ctx.service.user.getUser(username)

    ctx.body = new SuccessModel({ userInfo })
  }

  /**
   * token test
   */
  public async test() {
    const { ctx } = this
    const decode = ctx.decode
    console.log(decode)

    ctx.body = {
      decode,
    }
  }

  /**
   * 修改用户信息
   * @returns Promise<Model>
   */
  public async editUserInfo() {
    const { ctx } = this
    const { id } = ctx.decode
    const { signature = DEFAULT_SIG, avatar = DEFAULT_PIC } = ctx.request.body
    // 调用 service 层
    const result = await ctx.service.user.updateUser(id, { signature, avatar })
    ctx.body = result
      ? new SuccessModel()
      : new ErrorModal(errorInfo.changeInfoFailInfo)
  }

  /**
   * 修改密码
   * @returns response
   */
  public async modifyUserPassword() {
    const { ctx } = this
    const { id, username } = ctx.decode
    const { oldPassword, newPassword } = ctx.request.body

    const userInfo = await ctx.service.user.getUser(username)
    if (userInfo.password !== oldPassword) {
      ctx.body = new ErrorModal(errorInfo.changePasswordFailInfo)
      return
    }

    const result = await ctx.service.user.updateUser(id, {
      password: newPassword,
    })
    ctx.body = result
      ? new SuccessModel()
      : new ErrorModal(errorInfo.changePasswordFailInfo)
  }
}

module.exports = UserController
