const express = require('express')
const PostController = require('../controller/post')
const router = express.Router();

router.get('/', PostController.findAll);
router.get('/timeline', PostController.timeline)
router.get('/profile/:id', PostController.profile)
router.get('/test', PostController.test)


router.patch('/:id', PostController.update);
router.delete('/:id', PostController.destroy);

router.get('/test/:id', PostController.postTest)


router.post('/', PostController.create);

// router.get('/:id', PostController.findOne);
// router.post('/test', PostController.test)
// router.get('/test/:id', PostController.testOne);
module.exports = router