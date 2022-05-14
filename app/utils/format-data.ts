/**
 * @description 格式化数据
 * @author qingsds
 */

const dayjs = require('dayjs')

/**
 * 格式化时间
 * @param date 时间戳
 * @returns 格式化后的时间
 */
export const formatTime = (date: string) => {
  return dayjs(new Date(date)).format('YYYY-MM-DD HH:mm:ss')
}

function _formatUser(data: any) {
  if (!data.avatar) {
    data.avatar =
      'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png'
  }
  if (!data.signature) {
    data.signature = '这个人什么都没说...'
  }
  data.createAt = formatTime(data.createAt)
}

/**
 * 处理 user data
 * @param data user data
 */
export const formatUser = (data: any | any[]) => {
  if (Array.isArray(data)) {
    return data.map(_formatUser)
  }
  return _formatUser(data)
}
