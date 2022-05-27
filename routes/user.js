const express = require('express')
const UserController = require('../controller/user')
const router = express.Router();

router.get('/', UserController.findAll);
router.get('/:id', UserController.findOne);
router.get('/test', UserController.test)

router.post('/addfriend/:id', UserController.addFriend);
router.post('/test', UserController.test)
router.post('/test/:id', UserController.testId)
router.post('/', UserController.create);

router.patch('/:id', UserController.update);
router.delete('/:id', UserController.destroy);

router.post('/login', UserController.login)

module.exports = router