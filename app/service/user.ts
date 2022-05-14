/**
 * @description user service
 */
import { Service } from 'egg'
import { formatUser } from '../utils/format-data'

class UserService extends Service {
  /**
   * 根据 username 查询 用户信息
   * @param username string
   * @returns userInfo | null
   */
  public async getUserByUsername(username: string) {
    const { ctx } = this
    const userInfo = await ctx.model.User.findOne({
      where: { username },
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
  public async register(username: string, password: string) {
    const { ctx } = this
    const user = await ctx.model.User.create({ username, password })
    return user.dataValues
  }
}

module.exports = UserService
