// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './files/');
//       },
//     filename(req, file, cb) {
//       cb(null, file.originalname);
      
//     },
// });

// const upload = multer({ storage });


exports.test1 = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    res.status(200).send({
        message: "berhasil"
    })
};

exports.test2 = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }            

    // upload.single('file')
    
    res.status(200).send({
        message: 'berhasil',
        body: req.body,
        file: req.file      
    })
};

const cloudinary = require("cloudinary");

exports.upload = async (req, res) => {
    if(!req.body){
        res.status(404).send({
            message: 'image is not available',
        })
    }

    cloudinary.v2.uploader.upload(req.file.path, {folder : 'Post'}, 
    function(error, result) {        

        if(result){
            res.status(200).send({
                message: 'berhasil',
                result : result
            })
        }

        if(err){
            res.status(404).send({

            })
        }
    });


}

exports.upload64 = async (req, res) => {
    if(!req.body){
        res.status(404).send({
            message: 'image is not available',
        })
    }        

    cloudinary.v2.uploader.upload(req.body.files, {folder : 'Post'}, 
    function(error, result) {        

        if(result){
            res.status(200).send({
                message: 'berhasil',
                result : result,
                req: req.body
            })
        }

        if(error){
            res.status(404).send({
                message: 'data cant be send'            
            })
        }
    });


}

exports.form = async (req, res) => {
    if(!req.body){
        res.status(404).send({ message: 'data tidak ada'})
    }

    res.status(200).send({ 
        message: 'form',
        data: req.body
    })
}