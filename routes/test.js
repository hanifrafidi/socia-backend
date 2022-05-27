const express = require('express')
const Test = require('../controller/test')

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
// const uploads = multer();


const router = express.Router();

router.get('/', Test.test1);
// router.post('/', upload.single('file'),  Test.test2);
// router.post('/upload', upload.single('file'),  Test.upload);
router.post('/upload64', Test.form);
router.post('/form', Test.form);

module.exports = router