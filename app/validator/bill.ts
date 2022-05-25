/**
 * @description bill 数据验证
 * @author qingsds
 */

import _validator from './_validator'

const SCHEMA = {
  type: 'object',
  properties: {
    amount: {
      type: 'number',
    },
    type_id: {
      type: 'number',
    },
    type_name: {
      type: 'string',
    },
    date: {
      type: 'string',
    },
    pay_type: {
      type: 'number',
    },
    remark: {
      type: 'string',
    },
  },
}

export default function billValidate(data = {}) {
  return _validator(SCHEMA, data)
}
