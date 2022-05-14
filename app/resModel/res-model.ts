/**
 * @description res 数据模型
 * @author qingsds
 */

class BaseModel {
  public errno: number
  public data: any
  public message: string
  constructor({
    errno,
    data,
    message,
  }: {
    errno: number
    data?: any
    message?: string
  }) {
    if (new.target === BaseModel) {
      throw new Error('BaseModel 不能被实例化')
    }
    this.errno = errno
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      errno: 0,
      data,
    })
  }
}

class ErrorModal extends BaseModel {
  constructor({ errno, message }) {
    super({
      errno,
      message,
    })
  }
}

export default {
  SuccessModel,
  ErrorModal,
}
