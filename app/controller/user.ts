import { Controller } from 'egg'
import errorInfo from '../resModel/error-info'
import resModel from '../resModel/res-model'

class UserController extends Controller {
  public async register() {
    const { ctx } = this
    const { username, password } = ctx.request.body
    const userInfo = await ctx.service.user.getUserByUsername(username)

    if (userInfo && userInfo.username) {
      ctx.body = new resModel.ErrorModal(errorInfo.registerUserNameIsExistInfo)
      return
    }

    try {
      const result = await ctx.service.user.register(username, password)
      console.log(result)

      ctx.body = new resModel.SuccessModel()
    } catch (error) {
      console.error((error as Error).message)
    }
  }
}

module.exports = UserController
