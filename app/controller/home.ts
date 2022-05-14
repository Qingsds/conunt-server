import { Controller } from 'egg'

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this
    const { id } = ctx.query
    ctx.body = id
  }

  public async add() {
    const { ctx } = this
    const { title } = ctx.request.body
    ctx.body = { title }
  }
}
