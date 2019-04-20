const path = require('path');
module.exports = {
    development: {
        sitename: 'Node Site [Development]',
        mongoDB: 'mongodb://127.0.0.1:27017',
        data: {
            // speakers: path.join(__dirname, '../data/speakers.json'),
            // feedback: path.join(__dirname, '../data/feedback.json')
        }
    },
    production: {
        sitename: 'Node Site',
        mongoDB: 'mongodb://127.0.0.1:27017',
    },
    data: {
        // speakers: path.join(__dirname, '../data/speakers.json'),
        // feedback: path.join(__dirname, '../data/feedback.json')
    }

}