const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.post('/', userController.createUser, userController.cookieCreator, (req, res) => {
  res.status(200).json({ created: true });
});

module.exports = router;
