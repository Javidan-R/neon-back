
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUser);
router.get('/user/details/:id', userController.getUserDetails);



module.exports = router;