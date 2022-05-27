var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    image_id: 'string',
    image_path : 'string',
    caption: 'string',
    user_id: 'objectId',
    hashtag: 'array',
    date: 'string',
    comment: 'array',
    like: 'array'
},{
    collection: 'post'
});

var post = new mongoose.model('post', schema);

module.exports = post;
