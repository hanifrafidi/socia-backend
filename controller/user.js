const UserModel = require('../model/user')

const cloudinary = require("cloudinary");

// Create and Save a new user
exports.create = async (req, res) => {
    // if (!req.body.files && !req.body.caption && !req.body.user_id ) {
    //     res.status(400).send({ message: "Content can not be empty!" });
    // }

    cloudinary.v2.uploader.upload(req.body.files, {folder : 'User'}, 
    async function(error, result) {        
        if(result){                 

            const user = new UserModel({
                // image_id : result.public_id,
                // image_path : result.url,      
                profile : {
                    image_id : result.public_id,
                    image_path : result.url
                },
                username : req.body.username,
                email : req.body.username,
                password :  req.body.password,
                friend : [],
                type: 'socia'
            }); 
            
            user.save()
            .then(data => {
                res.status(200).send({
                    message:"User created successfully!!",
                    user:data,
                    accessToken : data._id,
                    result: result
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating user"
                });
            });
        }

        if(error){
            res.status(404).send({
                message: 'image cant be upload to cloudinary'            
            })
        }
    });   
        
};

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find().limit(10).sort({date : -1});
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

exports.login = async (req, res) => {
    if (!req.body.username && !req.body.password ) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    else{
        try {
            const user = await UserModel.find({
                username : req.body.username,
                password : req.body.password,
            })
            res.status(200).json(
                {
                    user : user[0],            
                    accessToken : user[0]._id,                
                }
            )        
                    
        } catch(error) {
            res.status(404).json({ message: error.message});
        }
    }
};

// Update a user by the id in the request
exports.addFriend = async (req, res) => {
    const {
        ObjectId
      } = require('mongodb');

    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = ObjectId(req.params.id);
    const id_friend = ObjectId(req.body.id_friend);

    await UserModel.find({ 
        _id : id,
        friend : id_friend 
    })
    .then(async data => {
        if(data.length  > 0){
            res.status(200).json({message : 'anda sudah berteman', data: data})
        }
        else{
            const add = await UserModel.updateOne(
                { _id : id }, 
                { $push: { friend: id_friend } }
            )          
            const add2 = await UserModel.updateOne(
                { _id : id_friend }, 
                { $push: { friend: id } }
            )          
            res.status(200).send({ 
                f1 : add,
                f2 : add2
            })            
        }
    })        
};

// Update a user by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.send({ message: "User updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    await UserModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `User not found.`
          });
        } else {
          res.send({
            message: "User deleted successfully!"
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

exports.testId = async (req, res) => {
    res.status(200).send({
        message : req.body,
        param : req.params.id
    })
};