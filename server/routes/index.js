const controllers = require('../controllers');

module.exports = (app) =>{

  app.route('/:userId')
     .get(controllers.CheckAuth, controllers.Get);

  app.route('/AddUser')
     .post(controllers.CheckAuth,controllers.AddUser);

  app.route('/AddUser')
     .put(controllers.AddUser);

  app.route('/:userId')
     .delete(controllers.CheckAuth, controllers.Delete);

  app.route('/login')
     .post(controllers.CheckAuth, controllers.Login);

  app.route('/favicon.ico')
     .get(controllers.Favicon);
  
}