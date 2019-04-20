const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        }
    },
    contact: {
        email: {
            type: String,
            required: true
        },
        address: {
            streetNumber: Number,
            streetName: String,
            city: String,
            country: String,
            postalCode: Number
        }
    },
    password: {
        type: String,
        required: true
    },
    isPaired: {
        type: Boolean,
        required: true
    },
    isParticipating: {
        type: Boolean
    },
    role: {
        type: String,
        required: true
    },
    partner: {
        partner_id: String
    }
   
});

module.exports = mongoose.model('User', userSchema);