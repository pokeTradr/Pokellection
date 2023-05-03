require('dotenv').config();
const gitHubModel = require('../models/gitHubModel');
const oAuthSessionModel = require('../models/oAuthSessionModel');

module.exports = {
  checkState: (req, res, next) => {
    const { state } = req.query;
    if ((state = process.env.STATE)) console.log(state);
    else
      return next({
        log: 'State does not match.',
        status: 500,
        message: 'OAuth error.',
      });
    return next();
  },

  requestAccessToken: (req, res, next) => {
    const { code } = req.query;
    const githubUrl = `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET_KET}&code=${code}`;
    fetch(githubUrl, {
      method: 'POST',
      headers: { Accept: 'application/json' },
    })
      .then((data) => data.json())
      .then((parsed) => {
        res.locals.accessToken = parsed.access_token;
        return next();
      })
      .catch((err) => {
        next({ log: err, message: 'OAuth error.' });
      });
  },

  getUserData: (req, res, next) => {
    const authString = `Bearer ${res.locals.accessToken}`;

    fetch('https;//api.github.com/user', {
      method: 'GET',
      headers: { Authorization: authString },
    })
      .then((data) => data.json())
      .then((parsed) => {
        const { login, id, avatar_url } = parsed;
        res.locals.userData = { login, id, avatar_url };
        return next();
      })
      .catch((err) => next({ log: err, message: 'OAuth error.' }));
  },

  saveUserData: (req, res, next) => {
    const { login, id, avatar_url } = req.locals.useData;

    gitHubModel
      .findOne({ id })
      .then((data) => {
        if (data !== null) {
          res.locals.cookies = { ssid: data._id.toString() };
          res.locals.userData = data;
          return next();
        }

        gitHubModel
          .create({ login, id, avatar_url })
          .then((data) => {
            res.locals.cookies = { ssid: data._id.toString() };
            res.locals.userData = data;
            return next();
          })
          .catch((err) => next({ log: err, message: 'OAuth error.' }));
      })
      .catch((err) => {
        console.log(err);
        return next();
      });
  },

  setCookie: (req, res, next) => {
    const cookies = res.locals.cookies;

    for (const key in cookies) {
      res.cookie(key, cookies[key], { httpOnly: true });
    }
    return next();
  },

  startSession: (req, res, next) => {
    oAuthSessionModel
      .findOneAndUpdate(
        { cookieId: res.locals.cookies.ssid },
        { cookieId: res.locals.cookies.ssid },
        { new: true, upsert: true }
      )
      .then((data) => {
        return next();
      })
      .catch((err) => {
        next({ log: err, message: 'OAuth error.' });
      });
  },

  checkSession: (req, res, next) => {
    if (!req.cookies.ssid) {
      res.locals.activeSession = false;
      return next();
    }

    oAuthSessionModel
      .findOne({ cookieId: req.cookies.ssid })
      .then((data) => {
        if (data !== null) res.locals.activeSession = true;
        else res.locals.activeSession = false;
        return next();
      })
      .catch((err) => next({ log: err, message: 'OAuth checkSession error.' }));
  },
};
