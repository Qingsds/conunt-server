import { Context } from 'egg'
import errorInfo from '../resModel/error-info'
import resModel from '../resModel/res-model'

/**
 * @description jwt 中间件
 * @author qingsds
 */
export default (secret: string): any => {
  return async (ctx: Context, next: () => Promise<void>) => {
    const token = ctx.request.header.authorization

    if (token == 'null' || !token) {
      ctx.body = new resModel.ErrorModal(errorInfo.loginCheckFailInfo)
      return
    }

    try {
      const decode = ctx.app.jwt.verify(token as string, secret)
      ctx.decode = decode
      await next()
    } catch (error) {
      ctx.body = new resModel.ErrorModal({
        errno: 101,
        message: (error as Error).message,
      })
    }
  }
}
