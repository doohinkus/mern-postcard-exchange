const controllers = require('../controllers');

module.exports = (app) =>{

  app.route('/')
     .get(controllers.Get);

  app.route('/')
     .post(controllers.Post);

  app.route('/')
     .put(controllers.Put);

  app.route('/')
     .delete(controllers.Delete);

  app.route('/favicon.ico')
     .get(controllers.Favicon);
  
}