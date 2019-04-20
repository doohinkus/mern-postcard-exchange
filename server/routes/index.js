const controllers = require('../controllers');

module.exports = (app) =>{
  app.route('/')
     .get(controllers.Index);

  app.route('/favicon.ico')
     .get(controllers.Favicon);
  
}