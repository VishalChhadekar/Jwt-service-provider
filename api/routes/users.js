var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

router.get('/', userController.getUser);
router.post('/', userController.createUser);

module.exports = router;
