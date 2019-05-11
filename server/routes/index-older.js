const express = require('express');
const router = express.Router();
const controllers = require('../controllers');


router
   .get('/GalleryImages', controllers.GalleryImages);
router
   .post('/AddUser', controllers.AddUser);
router
   .post('/Login', controllers.Login);
router 
   .get('/favicon.ico', controllers.Favicon);
router 
   .post('/AddImage', controllers.AddImage);

module.exports = router;


// router
//    .post('/:userId', controllers.CheckAuth, controllers.Get);

      
 
   
       

//    app.route('/EditUser/:userId')
//       .put(controllers.CheckAuth, controllers.EditUser);

   // app.route('DeleteUser/:userId')
   //    .delete(controllers.CheckAuth, controllers.DeleteUser);


   // app.route('/AddImage')
   //    .post(controllers.CheckAuth, controllers.UploadImage, controllers.AddImage);
// }