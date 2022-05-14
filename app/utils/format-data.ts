/**
 * @description 格式化数据
 * @author qingsds
 */

import { DEFAULT_PIC, DEFAULT_SIG } from '../contents'

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
    data.avatar = DEFAULT_PIC
  }
  if (!data.signature) {
    data.signature = DEFAULT_SIG
  }
  data.createAt = formatTime(data.createAt)
  return data
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
