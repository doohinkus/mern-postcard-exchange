const mongoose = require('mongoose');
//make sure mongod is running BEFORE TESTING!!!!

mongoose.Promise = global.Promise;

before(function(done){
    mongoose.connect('mongodb://localhost/postcardtest',  { useNewUrlParser: true, useCreateIndex: true });
    mongoose.connection.once('open', function(){
        console.log("Connection successful!!!!");
        done();
    })
    .on('error', err => console.log(err))

});
after(done => {
    //delete user and gallery collections
    // mongoose.connection.collections.forEach(col => col.deleteOne())
    mongoose.connection.collections['users'].deleteOne();
    mongoose.connection.collections['galleries'].deleteOne();

    mongoose.disconnect(()=> done());
});