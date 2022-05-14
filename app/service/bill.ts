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
}

module.exports = BillService
