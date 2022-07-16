/**
 * @description bill 数据验证
 * @author qingsds
 */

import _validator from './_validator'

const SCHEMA = {
  type: 'object',
  properties: {
    amount: {
<<<<<<< HEAD
      type: 'string',
    },
    type_id: {
      type: 'string',
=======
      type: 'number',
    },
    type_id: {
      type: 'number',
>>>>>>> 4f3d4fccbbf7171a030b059a71987a499bfdb735
    },
    type_name: {
      type: 'string',
    },
    date: {
      type: 'string',
    },
    pay_type: {
<<<<<<< HEAD
      type: 'string',
=======
      type: 'number',
>>>>>>> 4f3d4fccbbf7171a030b059a71987a499bfdb735
    },
    remark: {
      type: 'string',
    },
  },
}

export default function billValidate(data = {}) {
  return _validator(SCHEMA, data)
}
