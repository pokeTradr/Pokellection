const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const userController = {};

userController.createUser = (req, res, next) => {
  const { username } = req.body;
  let { password } = req.body;
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      console.log('inside of genSalt func')
      User.create({ username: username, password: hash })
        .then((data) => {
          console.log('inside of .then in createUser middleware')
          res.locals.newUser = data;
          return next();
        })
        .catch((err) => {
          const errObj = {
            log: 'Error occurred in user.create',
            status: 400,
            message: 'Error while creating user',
          };
          return next(errObj);
        });
    });
  });
};

userController.getUser = (req, res, next) => {
  // console.log("before user find one")
  // console.log("req body: ", req.body)
  User.findOne({ username: req.body.username }) /*, (err, result) => {*/
    .then(async (results) => {
      // console.log(results)
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        results.password
      );
      console.log('PASSWORD MATCH: ', passwordMatch);
      res.locals.truthy = passwordMatch;
      res.locals.userData = results.deckList;
      return next();
    })
    .catch((err) => {
      console.log('THIS IS THE ERROR: ', err);
      const errObj = {
        log: 'error occurred in userController.getUser',
        status: 400,
        message: { err: 'chill' },
      };
      return next(errObj);
    });
};

userController.saveUser = (req, res, next) => {
  console.log('in the updateList middleware')
  console.log('username: ', req.body.username)
  console.log('deckList', req.body.deckList)
  User.findOneAndUpdate({ username: req.body.username }, {deckList: req.body.deckList}, {new : true})
  .then((result) => {
    console.log('decklist saved')
    res.locals.message = 'deckList saved!'
    return next();
  })
  .catch((err) => {
    const errObj = {
      log: 'error occurred in userController.saveUser'
    }
  })
}

module.exports = userController;
