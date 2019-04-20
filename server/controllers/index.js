
const User = require('../models');
const mongoose = require('mongoose');

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
exports.Post = (req, res, next) =>{
    console.log(req.query);
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        name: {
            first: req.query.firstname,
            last: req.query.lastname
        },
        contact: {
            email: req.query.email,
            address: {
                streetNumber: req.query.streetnumber,
                streetName: req.query.streetname,
                city: req.query.city,
                country: req.query.country,
                postalCode: req.query.postalcode
            }
        },
        // encrypt
        password: req.query.password,
        isPaired: false,
        isParticipating: false,
        role: 'user',
        partner: null
    })
    user.save()
        .then(result => {
            console.log(result);
            return res.json({
                route: 'POST',
                success: 'Info added'
            });

        })
        .catch(err => console.error(err));
   
}
exports.Put = (req, res, next) =>{
    return res.json({
        route: 'PUT'
    });
}
exports.Delete = (req, res, next) =>{
    return res.json({
        route: 'DELETE'
    });
}