import { Service } from 'egg'

class HomeService extends Service {
  public async user() {
    return {
      name: 'qingsds',
      slogan: 'wdnmd',
    }
  }
}

module.exports = HomeService
