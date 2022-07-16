import { Service } from 'egg'

class BillService extends Service {
  /**
   * 添加 bill
   * @param params bill
   */
  public async createBill(params) {
    const { ctx } = this
    const result = await ctx.model.Bill.create({ ...params })
    return result.dataValues
  }

  /**
   * 根据 user_id 获取用户账单列表
   * @param param0 { user_id, type_id }
   * @returns
   */
  public async getBillListByUserId({ user_id, type_id }) {
    const { ctx } = this
    // 查询项
    const whereOpt: { user_id: number; type_id?: string | number } = {
      user_id,
    }
    if (type_id !== 'all') whereOpt.type_id = type_id

    const result = await ctx.model.Bill.findAll({
      order: [['id', 'desc']],
      where: { user_id },
    })
    return result
  }

  /**
   * 查询单个的数据
   * @param param0 { id, user_id }
   * @returns
   */
  public async getBillById({ id, user_id }) {
    const { ctx } = this
    const result = await ctx.model.Bill.findOne({
      where: { id, user_id },
    })

    return result.dataValues
  }

  /**
   * 修改 bill 数据
   * @param param0 { id, user_id,...params }
   * @returns
   */
  public async updateBill({ id, user_id, ...params }) {
    const { ctx } = this
    const result = await ctx.model.Bill.update(
      { ...params },
      { where: { id, user_id } }
    )
    //返回一个数组
    return result > 0
  }

  /**
   * delete bill
   * @param param0 {id,user_id}
   */
  public async delete({ id, user_id }) {
    const { ctx } = this
    const result = await ctx.model.Bill.destroy({
      where: { id, user_id },
    })

    return result > 0
  }
}

module.exports = BillService
