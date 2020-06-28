import * as express from 'express';

import BlogCtrl from './controllers/blog';
import UserCtrl from './controllers/user';

function setRoutes(app) {
  const router = express.Router();
  const blogCtrl = new BlogCtrl();
  const userCtrl = new UserCtrl();

  // Cats
  router.route('/blogs').get(blogCtrl.getAll);
  router.route('/blogs/count').get(blogCtrl.count);
  router.route('/blog').post(blogCtrl.insert);
  router.route('/blog/:id').get(blogCtrl.get);
  router.route('/blog/:id').put(blogCtrl.update);
  router.route('/blog/:id').delete(blogCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}

export default setRoutes;
