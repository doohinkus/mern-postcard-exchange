const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    // sender: String,
    // recipient: String,
    owner: String,
    origin: String,
    destination: String,
    url: String
});

module.exports = mongoose.model('Gallery', gallerySchema);