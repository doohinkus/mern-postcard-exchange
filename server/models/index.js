const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        first: {
            type: String,
            required: [true, "Must include first name"]
        },
        last: {
            type: String,
            required: [true, "Must include last name"]
        }
    },
    contact: {
        email: {
            type: String,
            unique: true,
            required: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        address: {
            streetId: {
                type: String,
                required: true
            },
            streetName: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            },
            postalCode: {
                type: Number,
                required: true
            },
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
        type: ['user', 'admin'],
        required: true
    },
    partner: {
        partner_id: String
    }
   
});

module.exports = mongoose.model('User', userSchema);