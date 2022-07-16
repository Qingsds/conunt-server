import { Controller } from 'egg'
import resModel from '../resModel/res-model'
import errorInfo from '../resModel/error-info'
import { DEFAULT_PAGE_SIZE } from '../contents'
import dayjs = require('dayjs')

const { SuccessModel, ErrorModal } = resModel

class BillController extends Controller {
  /**
   * 添加 bill 账单
   */
  public async add() {
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

  /**
   * 获取账单列表
   */
  public async list() {
    const { ctx } = this
    let {
      date,
      pageIndex = 0,
      pageSize = DEFAULT_PAGE_SIZE,
      type_id = 'all',
    } = ctx.request.query
    const id = ctx.decode.id
    pageIndex = Number(pageIndex)
    pageSize = Number(pageSize)

    let billList = await ctx.service.bill.getBillListByUserId({
      user_id: id,
      type_id,
    })

    // 根据月份过滤数据
    billList = billList.filter(item => {
      return dayjs(Number(item.date)).format('YYYY-MM') === date
    })

    let listMap = (billList as any[])
      .reduce((cur, item) => {
        //把第一个账单个格式化
        const date = dayjs(Number(item.date)).format('YYYY-MM-DD')
        //处理 cur 初始化阶段
        if (Array.isArray(cur) && !cur.length) {
          cur.push({
            date,
            bills: [item],
          })
        }
        // 这里是处理 map 中已经由当前日期,将 item 累加
        if (cur.length && Array.isArray(cur)) {
          const index = cur.findIndex(v => v.date === date)
          if (index !== -1) {
            cur[index].bills.push(item)
          }
        }

        // 这里是处理 map 中没有此日期, 需要添加对象
        if (cur.length && Array.isArray(cur)) {
          const index = cur.findIndex(v => v.date === date)
          if (index === -1) {
            cur.push({
              date,
              bills: [item],
            })
          }
        }
        return cur
      }, [])
      .sort((a, b) => {
        const b_date = dayjs(b.date)
        const a_date = dayjs(a.date)
        return (b_date as any) - (a_date as any)
      })
    // 当前页的数据
    const filterMap = listMap.slice(
      pageIndex * pageSize,
      (pageIndex + 1) * pageSize
    )
    // 当前月的合计支出
    const sumExpense = billList.reduce((count: number, cur) => {
      if (cur.pay_type === 1) {
        count += Number(cur.amount)
      }
      return count
    }, 0)

    // 当前月的合计收入
    const sumIncome = billList.reduce((count: number, cur) => {
      if (cur.pay_type === 2) {
        count += Number(cur.amount)
      }
      return count
    }, 0)

    ctx.body = new SuccessModel({
      sumExpense,
      sumIncome,
      list: filterMap || [], //当前页的数据
      totalPage: Math.ceil(billList.length / pageSize), //总页数
    })
  }

  /**
   * bill detail
   */
  public async detail() {
    const { ctx } = this
    const { id } = ctx.query
    // user id
    const { id: user_id } = ctx.decode
    const billDetail = await ctx.service.bill.getBillById({ id, user_id })
    if (billDetail) ctx.body = new SuccessModel({ ...billDetail })
  }

  /**
   * update bill
   */
  public async update() {
    const { ctx } = this
    const { id, ...params } = ctx.query
    // user id
    const { id: user_id } = ctx.decode
    const result = await ctx.service.bill.updateBill({ id, user_id, ...params })
    //返回数据
    ctx.body = result
      ? new SuccessModel()
      : new ErrorModal(errorInfo.changeInfoFailInfo)
  }

  /**
   * 删除账单
   */
  public async delete() {
    const { ctx } = this
    const { id } = ctx.request.body
    // user id
    const { id: user_id } = ctx.decode
    const result = await ctx.service.bill.delete({ id, user_id })
    //返回数据
    ctx.body = result
      ? new SuccessModel()
      : new ErrorModal(errorInfo.changeInfoFailInfo)
  }

  /**
   * 查询当月账单
   */
  public async data() {
    const { ctx } = this
    const { date = Date.now() } = ctx.query
    const { id :user_id} = ctx.decode
    //拿到原始数据
    const list = await ctx.service.bill.getBillListByUserId({user_id})
    // 拿到当月的开始时间和结束时间的时间戳
    const start = dayjs(date).startOf('month').unix() * 1000
    const end = dayjs(date).endOf('month').unix() * 1000
    //筛选
    const filterList = list.filter(item => {
      const timestamp = Number(item.date)
      return timestamp >= start && timestamp <= end
    })
    // 求当月的支出和输入
    let sumExpense = 0
    let sumIncome = 0
    filterList.forEach(item => {
      const amount = Number(item.amount)
      if (item.pay_type === 1) {
        sumExpense += amount
      }
      if (item.pay_type === 2) {
        sumIncome += amount
      }
    })
    // const sumExpense = filterList.reduce((cur, next) => {
    //   if (next.pay_type === 1) {
    //     const expense = Number(next.amount)
    //     cur += expense
    //   }
    //   return cur
    // }, 0)

    // const sumIncome = filterList.reduce((cur, next) => {
    //   if (next.pay_type === 2) {
    //     const income = Number(next.amount)
    //     cur += income
    //   }
    //   return cur
    // }, 0)

    // 求当月每一项的汇总
    const sumDate = filterList.reduce((cur, next) => {
      //查看数组中是否有当前类型
      const index = cur.findIndex(item => item.type_id === next.type_id)
      // 没有这个类型 添加
      if (index === -1) {
        cur.push({
          type_id: next.type_id,
          type_name: next.type_name,
          pay_type: next.pay_type,
          number: Number(next.amount),
        })
      } else {
        // 累加
        cur[index].number += Number(next.amount)
      }
      return cur
    }, [])

    ctx.body = new SuccessModel({
      sumExpense,
      sumIncome,
      sumDate: sumDate || [],
    })
  }
}

module.exports = BillController
