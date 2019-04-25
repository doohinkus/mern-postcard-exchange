const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    // sender: String,
    // recipient: String,
    owner: String,
    url: String
});

module.exports = mongoose.model('Gallery', gallerySchema);