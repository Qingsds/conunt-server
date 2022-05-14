/**
 * @description 密码加密
 * @author qingsds
 */

const crypt = require('crypto')
const CRYPTO_SECRET_KEY = process.env.CRYPTO

/**
 * md5 加密
 * @param content 明文
 * @returns
 */
const _md5 = (content: string) => {
  const hash = crypt.createHash('md5')
  return hash.update(content).digest('hex')
}

/**
 * 加密
 * @param content password
 * @returns 返回加密后的数据
 */
export const doCrypto = (content: string) => {
  const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
  return _md5(str)
}
