const express = require('express');
const createError = require('http-errors');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');
const bodyParser = require('body-parser');




const PORT = 5000;


const app = express();
app.use('/static', express.static(path.join(__dirname, '/uploads')));

// mongoose.connect('mongodb://127.0.0.1:27017/postcards', {useNewUrlParser: true})
mongoose.connect('mongodb://mongo:27017/postcards', {useNewUrlParser: true})
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch(err => {
    console.error('ERROR:::::->', err);
});


app.use(cors());
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