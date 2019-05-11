
const User = require('../models/user');
const Gallery = require('../models/gallery');
const path =require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
// const cors = require('cors');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(__dirname, '../uploads/'))
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});
const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else{
        cb(new Error({message: "Bad filetype. jpeg or png 5mg or fewer"}), false);
    }
}
const key = require('../../secret').toString();

const upload = multer({ 
    storage, 
    limits: 
        { 
            //limits to 5 megs
            fileSize: 1024*1024*5
        },
    fileFilter
    });

exports.CheckAuth = (req, res, next) =>{
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    if(typeof token !== 'undefined') {
        res.token = token.split(" ")[1];
        next();
    } else{
         return res.json({message: 'This Route is Forbidden'})
    }
    // next();
}
exports.Index = (req, res, next) =>{
    return res.json({
        route: "Index"
    });
}
exports.Favicon = (req, res, next) =>{
    return res.sendStatus(204);
}
//must match params coming in
exports.UploadImage = upload.single('galleryImage');
// exports.UploadImage = upload.none();

exports.GalleryImages = (req, res, next) => {
    Gallery.find({})
        .exec()
        .then(images => {
            // console.log("i ", images);
            return res.json(images)
        })
        .catch(err => console.log("GALLERY ERROR::::: ", err));
    //send data to frontend
}


exports.AddImage = (req, res, next) =>{
    console.log(req.body)
    // console.log("TYPES: ", req.file.filename, !req.file.filename);
    //   console.log(typeof req.file == 'undefined')
        if(typeof req.file == 'undefined') return res.json({message: "Problem uploading image"})
        //decode token to get user id
        const token = req.headers['x-access-token'] || req.headers['authorization'];
        // console.log("Token: ", token);
        jwt.verify(token,key,function(err,verifiedToken){
            if(err){
              console.log("TOKEN ERROR: ", err); 
              return res.json({message: "Error with token."})
            }else{
            //   console.log("USER ID:", verifiedToken.userId);
              //write to gallery document
              const image = new Gallery({
                  _id: mongoose.Types.ObjectId(),
                  url: req.file.filename,
                  owner: verifiedToken.userId
              })
              image.save()
                  .then(result => {
                      return res.json({
                          success: `Gallery Photo  ${req.file.filename} added`,
                          message: "Success",
                          image
                      });
                  })
                  .catch(err => {
                      console.error(err);
                      return res.json({
                          error: `An Error occured: ${err}`  
                      })
                  });
            }
          });

}
exports.Get = (req, res, next) =>{
    console.log(req.token)
    return res.json({
        route: `User by ID ${req.params.userId}`
    });
}

exports.Login = (req, res, next) => {
    User.findOne({'contact.email': req.body.email})
    .exec()
    .then(user => {
        if (user.length < 1) return res.status(404).json({error: `Login failed`});
        bcrypt.compare(req.body.password, user.password, (err, result) =>{
            if(err) console.log(err);
            if (result){
                jwt.sign(
                    {email: user.contact.email, userid: user._id}, 
                    key,
                    {expiresIn: '1h'}, 
                    (err, token) => {
                        if (err) console.log(err);
                        return res
                        //set token in header
                        //client needs to grab this info
                        .set('Authorization', `Bearer ${token}`)
                        .json({
                            token, 
                            message: "Success", 
                            // email: user.contact.email, 
                            // userid: user._id,
                            userinfo: user

                        });
                    });
            } else{
                return res.status(404).json({error: `Error occured`, message: 'User not found'})
            }
          
        });
    })
    .catch(err =>{    
        console.error(err);
        return res.json({
            error: `An Error occured: ${err}`,
            message: 'Login Failed'
        })
    });
        
}
exports.AddUser = 
    (req, res, next) => {
        // console.log(req.body)
        // console.log(req.body.userinfo)
        User.find({'contact.email': req.body.userinfo.email})
        .exec()
        .then(user => {
            if (user.length >= 1) return res.json({message: 'Duplicate information'});
            bcrypt.hash(req.body.userinfo.password, 10, (err, hash) => {
                if (err) return res.status(500).json({error: `Hashing error: ${err}`});
                
                const user = new User({
                    _id: mongoose.Types.ObjectId(),
                    firstname: req.body.userinfo.firstname,
                    lastname: req.body.userinfo.lastname,
                    contact: {
                        email: req.body.userinfo.email,
                        address: {
                            streetname: req.body.userinfo.streetname,
                            streetaddress: req.body.userinfo.streetaddress,
                            city: req.body.userinfo.city,
                            state: req.body.userinfo.state,
                            country: req.body.userinfo.country,
                            postalcode: req.body.userinfo.postalcode
                        }
                    },
                    password: hash,
                    ispaired: false,
                    isparticipating: false,
                    role: 'user',
                    partner: null
                })
                user.save()
                    .then(result => {
                
                        return res
                        .json({
                            route: 'POST',
                            message: 'Success',
                            userinfo: result
                        })
                    })
                    .catch(err => {
                        console.error(err);
                        return res.json({
                            error: `An Error occured: ${err}`  
                        })
                    });
            })
        })
        .catch(err => console.log(err));
  
    
}
// protected
exports.EditUser = (req, res, next) =>{
    console.log(req.token)
    return res.json({
        route: 'Edit User'
    });
}
// protected
exports.DeleteUser = (req, res, next) =>{
    console.log(req.params.userId);
    User.deleteOne({ _id: req.params.userId }, (err, success) => {
        if (err) return res.status(400).json({error: err});
        return res.status(200).json({message: 'user deleted'});
    });
  
}

