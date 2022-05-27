var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    // image_id: 'string',
    // image_path : 'string',
    profile : 'object',
    username : 'string',
    email : 'string',
    password : 'string',
    friend: 'array',
    type: 'string'
},{
    collection: 'user'
});

var user = new mongoose.model('user', schema);

module.exports = user;
