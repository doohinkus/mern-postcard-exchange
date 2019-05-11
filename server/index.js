const express = require('express');
const createError = require('http-errors');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');
// const config =require('./config');
const bodyParser = require('body-parser');




const PORT = 5000;


const app = express();
// console.log(__dirname + '/uploads');
app.use('/static', express.static(path.join(__dirname, '/uploads')));

const db = mongoose.connect('mongodb://127.0.0.1:27017/postcards', {useNewUrlParser: true})
.then(()=>{
    console.log('Connected')
})
.catch(err => {
    console.error('ERROR:::::->', err);
});



app.use(cors());



// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, './views'));




app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// app.use(express.static('uploads'));
routes(app);
// app.get('/', routes);
// app.use('/uploads', express.static(__dirname + '/uploads'));
// app.use('/public', express.static(__dirname + '/public'));
// app.use(routes);




// app.use((req, res, next) => {
//     return next(createError(404, 'Could not find your fucking file!'));
// });

app.listen(PORT, ()=>{
    console.log(`App listening on ${PORT}`);
});

module.exports = app;