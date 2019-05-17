
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
        //verify token
        jwt.verify(token,key,function(err,verifiedToken){
            if(err) return res.json({message: "Error with token."});
            console.log("USER ID:", verifiedToken);
            //pass verified token to routes
            res.verifiedToken = verifiedToken;
            //next only gets hit when token is verified
            next();
        });
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
    // console.log("token: ", res.verifiedToken);
    // return res.json({token: "asdfds"});
    // next();
    
    if(!req.file || !req.body.senderpostalcode || !req.body.receiverpostalcode){
        return res.json({message: "Error with form data.", token: res.verifiedToken})
    }  

    const image = new Gallery({
        _id: mongoose.Types.ObjectId(),
        url: req.file.filename,
        owner: res.verifiedToken.userid,
        senderpostalcode: req.body.senderpostalcode,
        receiverpostalcode: req.body.receiverpostalcode
    })
    image.save()
        .then(result => {
            return res.json({
                success: `Gallery Photo  ${req.file.filename} added`,
                message: "Success",
                senderpostalcode: req.body.senderpostalcode,
                receiverpostalcode: req.body.receiverpostalcode,
                owner: res.verifiedToken.userid,
                // token: res.verifiedToken,
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
exports.Get = (req, res, next) =>{
    console.log(req.token)
    return res.json({
        route: `User by ID ${req.params.userId}`
    });
}

exports.Login = (req, res, next) => {
    console.log(req.body.email, req.body.password);
    // return res.json({ email: req.body.email })
    User.findOne({email: req.body.email}, (err, user) => {
        if(err) return res.json({error: err});
        console.log(user);
        if (user.length < 1) return res.status(404).json({error: `Login failed`});
        bcrypt.compare(req.body.password, user.password, (err, result) =>{
            if(err) console.log(err);
            if (result){
                jwt.sign(
                    {email: user.email, userid: user._id}, 
                    key,
                    {expiresIn: '1h'}, 
                    (err, token) => {
                        if (err) console.log(err);
                        return res
                        //set token in header
                        //client needs to grab this info
                        .set('Authorization', `Bearer ${token}`)
                        .json({
                            //set token for app
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
   
    // .catch(err =>{    
    //     console.error(err);
    //     return res.json({
    //         error: `An Error occured: ${err}`,
    //         message: 'Login Failed'
    //     })
    // });
   
        
}
exports.AddUser = 
    (req, res, next) => {
        // console.log(req.body)
        console.log(req.body.userinfo)
        // User.find({'contact.email': req.body.userinfo.email})
        User.find({ email : req.body.userinfo.email})
        .exec()
        .then(user => {
            if (user.length >= 1) return res.json({message: 'Duplicate information'});
            bcrypt.hash(req.body.userinfo.password, 10, (err, hash) => {
                if (err) return res.status(500).json({error: `Hashing error: ${err}`});
                
                const user = new User({
                    _id: mongoose.Types.ObjectId(),
                    firstname: req.body.userinfo.firstname,
                    lastname: req.body.userinfo.lastname,
                    // contact: {
                    email: req.body.userinfo.email,
                        // address: {
                    streetname: req.body.userinfo.streetname,
                    streetaddress: req.body.userinfo.streetaddress,
                    city: req.body.userinfo.city,
                    state: req.body.userinfo.state,
                    country: req.body.userinfo.country,
                    postalcode: req.body.userinfo.postalcode,
                        // }
                    // },
                    password: hash,
                    ispaired: false,
                    isparticipating: false,
                    role: 'user',
                    partner: null
                })
                user.save()
                    .then(result => {
                //set token???
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
// protected PUT REQUEST!!!!!!!
exports.EditUser = (req, res, next) =>{
    //search by id from verified token
    const query = {
        _id: res.verifiedToken.userid
    }
    console.log("BODY: ", req.body.userinfo);
    // update should only have values that change
    
    // console.log(req.body);
    // return res.json({ query, update})
    User.findOneAndUpdate(query, req.body.userinfo, {upsert:true}, function(err, result){
        if (err) return res.send(500, { error: err });
        // console.log(result);
        // return updated record
        User.findOne(query, (err, user) => {
            console.log("second query, ", user);
            if (user){
                jwt.sign(
                    {email: user.email, userid: user._id}, 
                    key,
                    {expiresIn: '1h'}, 
                    (err, token) => {
                        if (err) console.log(err);
                        return res
                        //set token in header
                        //client needs to grab this info
                        .set('Authorization', `Bearer ${token}`)
                        .json({
                            //sends token to app
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
            // return res.json({message: "Success", userinfo: result});
        });
    
        // return res.json({message: `user: ${req.body.firstname} successfully updated`, userinfo: result});
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

