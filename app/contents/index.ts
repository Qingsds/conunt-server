import { doCrypto } from './../utils/bcrypt'
export const DEFAULT_SIG = '这个人很懒,什么都没说...'

export const DEFAULT_PIC =
  'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png'

export const DEFAULT_PAGE_SIZE = 5

export const INIT_TYPE_DATA = [
  { name: '餐饮', type: 1, user_id: 0 },
  { name: '服饰', type: 1, user_id: 0 },
  { name: '交通', type: 1, user_id: 0 },
  { name: '日用', type: 1, user_id: 0 },
  { name: '购物', type: 1, user_id: 0 },
  { name: '学习', type: 1, user_id: 0 },
  { name: '医疗', type: 1, user_id: 0 },
  { name: '人情', type: 1, user_id: 0 },
  { name: '旅行', type: 1, user_id: 0 },
  { name: '其他', type: 1, user_id: 0 },
  { name: '工资', type: 2, user_id: 0 },
  { name: '理财', type: 2, user_id: 0 },
  { name: '奖金', type: 2, user_id: 0 },
  { name: '转账', type: 2, user_id: 0 },
  { name: '退款', type: 2, user_id: 0 },
  { name: '其他', type: 2, user_id: 0 },
]

export const INIT_USER_DATA = 
  { username: 'qingsds', password: doCrypto('123456') }

export const INIT_LIST_DATA = [
  
]