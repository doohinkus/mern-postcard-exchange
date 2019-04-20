const express = require('express');
const createError = require('http-errors');
const path =require('path');
const bodyParser = require('body-parser');

const app = express();

const routes = require('./routes');
const config = require('./config');

const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));

routes(app);

app.use((req, res, next) => {
    return next(createError(404, 'Could not find your fucking file!'));
});

app.listen(PORT, ()=>{
    console.log(`App listening on ${PORT}`);
});

module.exports = app;