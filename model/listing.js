var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    
},{
    collection: 'listingsAndReviews'
});

var listing = new mongoose.model('listing', schema);

module.exports = listing;
