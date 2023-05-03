const express = require('express');
const router = express.Router();
require('dotenv').config();

const oAuthoController = require('../controller/oAuthController');
const { startSession } = require('../models/userModel');

router.use('/login', (req, res) => {
  res
    .status(200)
    .redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&state=${process.env.STATE}`
    );
});

router.use(
  '/redirected',
  oAuthoController.checkState,
  oAuthoController.requestAccessToken,
  oAuthoController.getUserData,
  oAuthoController.saveUserData,
  oAuthoController.setCookie,
  oAuthoController.startSession,
  (req, res) => {
    res.status(200).json(res.locals.userData);
  }
);

module.exports = router;
