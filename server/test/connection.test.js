const mongoose = require('mongoose');
//make sure mongod is running BEOFRE TESTING!!!!

mongoose.Promise = global.Promise;

before(function(done){
    mongoose.connect('mongodb://localhost/testdaroo',  { useNewUrlParser: true, useCreateIndex: true });
    mongoose.connection.once('open', function(){
        console.log("Connection successful!!!!");
        done();
    })
    .on('error', err => console.log(err))

})

// beforeEach(function(done){
//     //LOWERCASE AND PLURAL!!!!
//     // mongoose.connection.collections.galleries.drop(err=>{
//     //     if (err) console.log('ERROR DROPPING GALLERY COLLECTION::::> ');
//     //     done();
//     // });
//     // mongoose.connection.collections.users.drop(err=>{
//     //     if (err) console.log('ERROR DROPPING USERS COLLECTION::::> ');
//     //     done();
//     // });
// })