
const User = require('../models/user');
const Gallery = require('../models/gallery');
const path =require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');

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
        res.json({message: 'Forbidden'})
    }
}
exports.Index = (req, res, next) =>{
    return res.json({
        route: "Index"
    });
}
exports.Favicon = (req, res, next) =>{
    return res.sendStatus(204);
}
exports.UploadImage = upload.single('galleryImage');
// exports.UploadImage = upload(req, res, err => {
//         if (err) return res.json({message: "Error uploading file"});
//         console.log("MULTER: ", req.file)
//     });



exports.Gallery = (req, res, next) =>{
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
                          route: 'GALLERY',
                          success: `Gallery Photo  ${req.file.filename} added`,
                          image
                      });
                  })
                  .catch(err => {
                      console.error(err);
                      return res.json({
                          error: `An Error occured: ${err}`  
                      })
                  });
            //   return res.json({message: "Error no image supplied"});
            }
          });
   
    // return res.json({message: 'Error. No image provided'});
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
                    {email: user.contact.email, userId: user._id}, 
                    key,
                    {expiresIn: '1h'}, 
                    (err, token) => {
                        if (err) console.log(err);
                        return res
                        //set token in header
                        //client needs to grab this info
                        .set('Authorization', `Bearer ${token}`)
                        .json({token, message: "Success", email: user.contact.email, userId: user._id});
                    });
            } else{
                return res.status(404).json({error: `Error occured`})
            }
          
        });
    })
    .catch(err =>{    
        console.error(err);
        return res.json({
            error: `An Error occured: ${err}`  
        })
    });
        
}
exports.AddUser = 
    (req, res, next) => {
        User.find({'contact.email': req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) return res.status(422).json({error: 'duplicate information'});
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) return res.status(500).json({error: `Hashing error: ${err}`});
                
                const user = new User({
                    _id: mongoose.Types.ObjectId(),
                    name: {
                        first: req.body.firstname,
                        last: req.body.lastname
                    },
                    contact: {
                        email: req.body.email,
                        address: {
                            streetId: req.body.streetid,
                            streetName: req.body.streetname,
                            city: req.body.city,
                            country: req.body.country,
                            postalCode: req.body.postalcode
                        }
                    },
                    password: hash,
                    isPaired: false,
                    isParticipating: false,
                    role: 'user',
                    partner: null
                })
                user.save()
                    .then(result => {
                        // console.log(result);
                        return res.json({
                            route: 'POST',
                            success: 'Info added',
                            userInfo: result
                        });
            
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

