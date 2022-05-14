export default {
  // 用户名已存在
  registerUserNameIsExistInfo: {
    errno: 10001,
    message: '用户名已存在 请检查',
  },
  // 注册失败
  registerFailInfo: {
    errno: 10002,
    message: '注册失败 请重试',
  },
  registerUserNameNotExistInfo: {
    errno: 10003,
    message: '用户名不存在，可以注册',
  },
  loginFailInfo: {
    errno: 10004,
    message: '登录失败 请检查您的用户名和密码',
  },
  loginCheckFailInfo: {
    errno: 10005,
    message: '当前未登录',
  },
}
