/**
 * @description 数据校验中间件
 * @author qingsds
 */

import { Context } from 'egg'
import resModel from '../resModel/res-model'
import errorInfo from '../resModel/error-info'

const { ErrorModal } = resModel

/**
 * 接收一个校验函数
 * @param validatorFn 
 * @returns 
 */
export default function generateValidator(validatorFn: (data: any) => any) {
  async function validator(ctx: Context, next: () => Promise<void>) {
    const data = ctx.request.body
    const error = validatorFn(data)
    if (error) {
      ctx.body = new ErrorModal(errorInfo.jsonSchemaFailInfo)
      return
    }

    await next()
  }
  return validator
}
