const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    // sender: String,
    // recipient: String,
    posted: Date,
    author: {
        id: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Gallery"},
        name: String,
    }
    text: String
});

module.exports = mongoose.model('Comment', commentSchema);