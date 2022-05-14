/**
 * @description user service
 * @author qingsds
 */
import { Service } from 'egg'
import { formatUser } from '../utils/format-data'

class UserService extends Service {
  /**
   * 根据 username 查询 用户信息
   * @param username string
   * @returns userInfo | null
   */
  public async getUser(username: string, password?: string) {
    const { ctx } = this
    // 查询参数
    const whereOpt: { username: string; password?: string } = { username }

    if (password) {
      whereOpt.password = password
    }
    const userInfo = await ctx.model.User.findOne({
      where: whereOpt,
    })

    if (userInfo) {
      return formatUser(userInfo.dataValues)
    }
    return null
  }

  /**
   * 注册
   * @param username string
   * @param password string
   * @returns userInfo
   */
  public async createUser(username: string, password: string) {
    const { ctx } = this
    const user = await ctx.model.User.create({ username, password })
    return user.dataValues
  }

  /**
   * 修改用户信息
   * @param username string
   * @param param 需要修改的参数
   */
  public async updateUser(id: number, params) {
    const { ctx } = this
    const result = await ctx.model.User.update(
      { ...params },
      {
        where: { id },
      }
    )
    console.log(result)
    return result[0] > 0
  }
}

module.exports = UserService
