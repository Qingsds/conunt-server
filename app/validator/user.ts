/**
 * @description user 数据校验
 * @author qingsds
 */

import _validator from './_validator'

const SCHEMA = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', // 字母开头，字母数字下划线
      maxLength: 255,
      minLength: 2,
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 3,
    },
    newPassword: {
      type: 'string',
      maxLength: 255,
      minLength: 3,
    },
    signature: {
      type: 'string',
      maxLength: 255,
      minLength: 1,
    },
    avatar: {
      type: 'string',
      maxLength: 255,
      minLength: 3,
    },
  },
}

export default function userValidate(data = {}) {
  return _validator(SCHEMA, data)
}
