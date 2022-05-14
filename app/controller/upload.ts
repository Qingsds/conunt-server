import { Controller } from 'egg'

import dayjs = require('dayjs')
import resModel from '../resModel/res-model'
const fs = require('fs')
const path = require('path')
const mkdir = require('mkdirp')

class UploadController extends Controller {
  // 上传文件
  public async upload() {
    const { ctx } = this
    // config.multipart 的 mode 属性为 file
    let file = ctx.request.files[0]
    // 资源路径
    let uploadDir = ''

    try {
      // 拿到当前文件
      let f = fs.readFileSync(file.filepath)
      // 获取日期
      const day = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      //   创建图片保存路径
      const dir = path.join(this.config.uploadDir, day)
      const date = Date.now()
      await mkdir(dir)
      //返回的文件保存路径
      uploadDir = path.join(dir, date + path.extname(file.filename))
      // 写入文件
      fs.writeFileSync(uploadDir, f)
    } finally {
      ctx.cleanupRequestFiles()
    }

    ctx.body = new resModel.SuccessModel({})
  }
}

module.exports = UploadController
