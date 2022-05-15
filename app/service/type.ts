import { Service } from 'egg'

class TypeService extends Service {
  /**
   * 获取列表
   */
  public async list(user_id: number) {
    const { ctx } = this

    const result = await ctx.model.Type.findAll({
      where: {
        user_id: ctx.model.or([user_id, 0]),
      },
    })

    return result.dataValues
  }
  /**
   * 添加类型
   * @param param0 { name, type, user_id }
   * @returns
   */
  public async add({ name, type, user_id }) {
    const { ctx } = this

    const result = await ctx.model.Type({
      name,
      type,
      user_id,
    })

    return result.dataValues
  }

  /**
   * 修改 type
   * @param param0 { id, user_id, ...params }
   * @returns boolean
   */
  public async update({ id, user_id, ...params }) {
    const { ctx } = this

    const result = await ctx.model.update(
      { ...params },
      { where: { id, user_id } }
    )

    return result[0] > 0
  }

  /**
   * 删除 type
   * @param id
   * @returns
   */
  public async delete(id: number, user_id: number) {
    const { ctx } = this
    const result = await ctx.model.destroy({ where: { id, user_id } })
    return result[0] > 0
  }

  /**
   * 通过 name 查询 type
   * @param name 
   * @returns 
   */
  public async getByName(name: string) {
    const { ctx } = this
    const result = await ctx.model.Type.findOne({
      where: { name },
    })

    return result?.dataValues
  }
}

module.exports = TypeService
