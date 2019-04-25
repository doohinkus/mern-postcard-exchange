const controllers = require('../controllers');

module.exports = (app) =>{

  app.route('/:userId')
     .get(controllers.CheckAuth, controllers.Get);

  app.route('/AddUser')
     .post(controllers.AddUser);

  app.route('/EditUser/:userId')
     .put(controllers.CheckAuth, controllers.EditUser);

  app.route('DeleteUser/:userId')
     .delete(controllers.CheckAuth, controllers.DeleteUser);

  app.route('/login')
  //sets token in header
  //front end needs to grab it
  //And send in header
     .post(controllers.Login);

  app.route('/favicon.ico')
     .get(controllers.Favicon);

  app.route('/gallery')
     .post(controllers.CheckAuth, controllers.UploadImage, controllers.Gallery);
}