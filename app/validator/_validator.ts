/**
 * @description 校验
 * @author qingsds
 */
const Ajv = require('ajv')
const ajv = new Ajv()

/**
 * 校验函数
 * @param schema 校验规则
 * @param data 校验数据
 * @returns
 */
export default function _validator(schema, data) {
  const valid = ajv.validate(schema, data)
  if (!valid) {
    return ajv.errors[0]
  }
}
