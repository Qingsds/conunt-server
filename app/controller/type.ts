import { Controller } from 'egg'
import errorInfo from '../resModel/error-info'
import resModel from '../resModel/res-model'
const { SuccessModel, ErrorModal } = resModel

class TypeController extends Controller {
  /**
   * type list
   */
  public async list() {
    const { ctx } = this
    const { id } = ctx.decode
    const list = await ctx.service.type.list(id)

    ctx.body = new SuccessModel({ typeList: list })
  }

  /**
   * 修改 type 只能修改自己的
   */
  public async update() {
    const { ctx } = this
    const { id, ...params } = ctx.request.body
    const { id: user_id } = ctx.decode
    const result = await ctx.service.type.update({ id, user_id, ...params })

    ctx.body = result
      ? new SuccessModel()
      : new ErrorModal(errorInfo.changeInfoFailInfo)
  }

  /**
   * 删除 自定义的 type
   */
  public async delete() {
    const { ctx } = this
    const { id } = ctx.request.body
    const { id: user_id } = ctx.decode

    const result = await ctx.service.type.update(id, user_id)

    ctx.body = result
      ? new SuccessModel()
      : new ErrorModal(errorInfo.changeInfoFailInfo)
  }

  /**
   * 添加
   */
  public async add() {
    const { ctx } = this
    const { name, type } = ctx.request.body
    const { id: user_id } = ctx.decode

    // 查询当前类型是否存在
    const isExist = await ctx.service.type.getByName(name)
    if (!isExist) {
      ctx.body = new ErrorModal(errorInfo.addBillFailInfo)
    }
    try {
      const result = await ctx.service.type.add({ name, type, user_id })
      ctx.body = new SuccessModel({ ...result })
    } catch (error) {
      console.log((error as Error).message)
    }
  }
}

module.exports = TypeController
