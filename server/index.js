const express = require('express');
const createError = require('http-errors');
const mongoose = require('mongoose');
const cors = require('cors');

// const config =require('./config');
const bodyParser = require('body-parser');




const PORT = 5000;


const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/postcards', {useNewUrlParser: true})
.then(()=>{
    console.log('Connected')
})
.catch(err => {
    console.error('ERROR:::::->', err);
});



app.use(cors());
const routes = require('./routes');



// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, './views'));





app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

routes(app);




app.use((req, res, next) => {
    return next(createError(404, 'Could not find your fucking file!'));
});

app.listen(PORT, ()=>{
    console.log(`App listening on ${PORT}`);
});

module.exports = app;