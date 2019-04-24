
const User = require('../models');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = require('../../secret').toString();


exports.CheckAuth = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1].toString();
        const decoded = jwt.verify(
            token, 
            key);
        req.userToken = decoded;
        next();
    } catch(err){
        res.status(401).json({error: `Auth failed: ${err}`})
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
exports.Get = (req, res, next) =>{
    return res.json({
        route: 'GET'
    });
}
exports.Login = (req, res, next) => {
    // console.log("key ",key )
    User.findOne({'contact.email': req.body.email})
    .exec()
    .then(user => {
        if (user.length < 1) return res.status(404).json({error: `Login failed`});
        bcrypt.compare(req.body.password, user.password, (err, result) =>{
            if (result){
                const token = jwt.sign({
                    email: user.email,
                    userId: user._id
                }, 
                key,
                {
                    expiresIn: '1h'
                })
                return res.status(200).json({
                    message: 'Successful Auth',
                    token: token
                })
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
exports.Put = (req, res, next) =>{
    return res.json({
        route: 'PUT'
    });
}
// protected
exports.Delete = (req, res, next) =>{
    console.log(req.params.userId);
    // User.findById(req.params.userId, function (err, doc) {
    //     if (err) next(console.log(err))
    //     next(console.log(doc))
    // });
    User.deleteOne({ _id: req.params.userId }, (err, success) => {
        if (err) return res.status(400).json({error: err});
        return res.status(200).json({message: 'user deleted'});
    });
  
}

