const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const gallerySchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    owner: String,
    senderpostalcode: String,
    receiverpostalcode: String,
    url: String,
    comments: [{
        _id: mongoose.Types.ObjectId,
        posted: Date,
        author: String, 
        text: String
    }]
});

module.exports = mongoose.model('Gallery', gallerySchema);