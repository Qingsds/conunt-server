import { Controller } from 'egg'
import resModel from '../resModel/res-model'
import errorInfo from '../resModel/error-info'

const { SuccessModel, ErrorModal } = resModel

class BillController extends Controller {
  public async addBill() {
    const { ctx } = this
    const {
      amount,
      type_id,
      type_name,
      date = Date.now(),
      pay_type,
      remark = '',
    } = ctx.request.body

    // 判空处理
    if (!amount || !type_id || !type_name || !date || !pay_type) {
      ctx.body = new ErrorModal(errorInfo.addBillFailInfo)
    }
    // 因为有中间件的处理, 可以拿到 user的id
    const user_id = ctx.decode.id
    // 调用 service 层
    try {
      let bill = await ctx.service.bill.createBill({
        amount,
        type_id,
        type_name,
        date,
        pay_type,
        remark,
        user_id,
      })
      console.log(bill)

      ctx.body = new SuccessModel({ bill })
    } catch (error) {
      console.error('error-message: ' + (error as Error).message)
    }
  }
}

module.exports = BillController
