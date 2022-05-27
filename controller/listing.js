const ListingModel = require('../model/listing')

// Create and Save a new listing
exports.create = async (req, res) => {
    if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const listing = new ListingModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone
    });
    
    await listing.save()
    .then(data => {
        res.send({
            message:"Listing created successfully!!",
            listing:data
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating listing"
        });
    });
};

// Retrieve all listings from the database.
exports.findAll = async (req, res) => {
    try {
        const listing = await ListingModel.find().limit(10);
        res.status(200).json(listing);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single Listing with an id
exports.findOne = async (req, res) => {
    try {
        const listing = await ListingModel.findById(req.params.id);
        res.status(200).json(listing);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Update a listing by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await ListingModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Listing not found.`
            });
        }else{
            res.send({ message: "Listing updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a listing with the specified id in the request
exports.destroy = async (req, res) => {
    await ListingModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Listing not found.`
          });
        } else {
          res.send({
            message: "Listing deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};


exports.test = async (req, res) => {
    res.status(200).send({
        message : req.body
    })
};