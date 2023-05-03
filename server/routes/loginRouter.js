const express = require('express');
const router = express.Router();

const userController = require('../controller/userController')

router.post("/", userController.getUser, (req, res) => {
    res.status(200).json(res.locals.truthy);
  })

module.exports = router