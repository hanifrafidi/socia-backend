const PostModel = require('../model/post')
const UserModel = require('../model/user')
var mongoose = require('mongoose');

const cloudinary = require("cloudinary");

// Create and Save a new post
exports.create = async (req, res) => {
    if (!req.body.files && !req.body.caption && !req.body.user_id ) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    cloudinary.v2.uploader.upload(req.body.files, {folder : 'Post'}, 
    async function(error, result) {        
        if(result){                 

            const post = new PostModel({
                image_id : result.public_id,
                image_path : result.url,
                caption: req.body.caption,
                user_id: req.body.user_id,
                hashtag: JSON.parse(req.body.hashtag),
                date: result.created_at,
                comment: JSON.parse(req.body.comment),
                like: JSON.parse(req.body.like)
            }); 
            
            post.save()
            .then(data => {
                res.status(200).send({
                    message:"Post created successfully!!",
                    post:data,
                    req: req.body,
                    result: result
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating post"
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

// Retrieve all posts from the database.
exports.findAll = async (req, res) => {
    try {
        const post = await PostModel.find().limit(10).sort({date : -1});
        res.status(200).json(post);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single Post with an id
exports.findOne = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        res.status(200).json(post);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

exports.profile = async (req, res) => {    
    const {
        ObjectId
      } = require('mongodb');
    
    const id = ObjectId(req.params.id)
    // const user = await UserModel.find({ _id : id })
    const user = await UserModel.aggregate([
        { $match: { _id : id}},
        { $lookup: 
            {
                from : 'user',
                localField: 'friend.user_id',
                foreignField: '_id',
                as: 'friend_profile'
            }
        }
        ])
    const post = await PostModel.aggregate([
                { $match: { user_id : id}},
                { $lookup: 
                    {
                        from : 'user',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'user_detail'
                    }
                }
                ])
    res.status(200).send({
        post: post,
        profile : user[0],
    });    
    
    
};

// Update a post by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await PostModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Post not found.`
            });
        }else{
            res.send({ message: "Post updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a post with the specified id in the request
exports.destroy = async (req, res) => {
    await PostModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Post not found.`
          });
        } else {
          res.send({
            message: "Post deleted successfully!"
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

exports.testOne = async (req, res) => {
    res.status(200).send({
        message : req.params.id
    })
};

exports.postTest = async (req, res) => {
    const post = await PostModel.find({
        user_id : req.params.id
    })
    res.status(200).send({
        message : req.params.id,
        post : post
    })
};

exports.timeline = async (req, res) => {
    
    const post = await PostModel.aggregate([
        { $lookup: 
            {
                from : 'user',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user_detail'
            }
        }
    ]).sort({date : -1}).limit(10)
    res.status(200).send(
        post
    )
       
    
};