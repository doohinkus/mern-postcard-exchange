// killall -9 node
//make sure mongod is running!!!!
const mongoose = require('mongoose');
// const assert = require('assert');
const expect = require('chai').expect;
const assert = require('chai').assert
const Gallery = require('../models/gallery');
const User = require('../models/user');

describe('Gallery collection', () => {
    beforeEach(done => {
        const id = mongoose.Types.ObjectId();
        const image = new Gallery({
            _id: id,
            owner: "Rafael",
            senderpostalcode: 97055,
            receiverpostalcode: 95125,
            url: '/static/avatar.gif',
            comments: [{
                posted: new Date(),
                author: "Monica",
                text: "Beautiful postcard"
            }]
        });
        image.save()
            .then(() => done());
        
    });
  
    it('saves a record to the gallery', done => {
        Gallery.findOne({
            owner: "Rafael"
        })
        .then(result => {
            expect(result.owner).to.eql("Rafael");
            done();
        })
    });

    it('saves a record to the gallery comments', done => {
        Gallery.findOne({
            owner: "Rafael"
        })
        .then(result => {
            // result.comments.push({
            //     posted: new Date(),
            //     author: "Monica",
            //     text: "This is a great card!!!!"
            // });
            // expect(result.comments).to.have.lengthOf(1);
            result.comments.push({
                posted: new Date(),
                author: "Jeff",
                text: "This is a decent card!!!!"
            });
            expect(result.comments).to.have.lengthOf(2);
        })
        done();
    });
    
});


describe('Users collection', () => {
    beforeEach(done => {
        const id = mongoose.Types.ObjectId();
        const user = new User({
            _id: id,
            firstname: "Rafael",
            lastname: "Perez",
            contact: {
                email: "doohinkus@gmail.com",
                address: {
                    streetaddress: "1234 Fake Street",
                    city: "Fake City",
                    state: "CA",
                    country: "USA",
                    postalcode: 97055
                }
            },
            password: "fake",
            ispaired: 0,
            isparticipating: 0,
            role: 'user',
            partner: 'id goes here'
        });
        // console.log(user);
        user.save((err, result) => {
                // if (err) console.log(err);
                // console.log(result);
                done();
        })
         
        
    });
    it('saves a user to the collection', done =>{
        User.findOne({
            firstname: "Rafael"
        }, (err, result) => {
            if(err) console.log("FIND ONE ERRO::::> ", err);
            expect(result.firstname).to.equal("Rafael");
            done();
        });

    });

});