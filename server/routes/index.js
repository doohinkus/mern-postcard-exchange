const controllers = require('../controllers');

module.exports = (app) =>{

   app.route('/GalleryImages')
       .get(controllers.GalleryImages);

   app.route('/AddUser')
      .post(controllers.AddUser);
      
   app.route('/Login')
   //sets token in header 
   //front end needs to grab token
   //And send it back in the header
      .post(controllers.Login);
      
   app.route('/:userId')
   .get(controllers.CheckAuth, controllers.Get);
   
       

   app.route('/EditUser/:userId')
      .put(controllers.CheckAuth, controllers.EditUser);

   app.route('DeleteUser/:userId')
      .delete(controllers.CheckAuth, controllers.DeleteUser);


   app.route('/favicon.ico')
      .get(controllers.Favicon);

   app.route('/AddImage')
      .post(controllers.CheckAuth, controllers.UploadImage, controllers.AddImage);
}