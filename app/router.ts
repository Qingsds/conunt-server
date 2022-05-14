import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  router
    .get('/', controller.home.index)
    .post('/add', controller.home.add)
    .post('/register',controller.user.register)
}
