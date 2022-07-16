/**
 * @description bill 数据验证
 * @author qingsds
 */

import _validator from './_validator'

const SCHEMA = {
  type: 'object',
  properties: {
    amount: {
      type: 'string',
    },
    type_id: {
      type: 'string',
    },
    type_name: {
      type: 'string',
    },
    date: {
      type: 'string',
    },
    pay_type: {
      type: 'string',
    },
    remark: {
      type: 'string',
    },
  },
}

export default function billValidate(data = {}) {
  return _validator(SCHEMA, data)
}
