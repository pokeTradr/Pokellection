const express = require('express');
const path = require('path');
const APIController = require('./controller/APIController');
const app = express();
// change for testing
// const PORT = process.env.NODE_ENV === 'test' ? 3001 : 3000;
const PORT = 3000;
const userController = require('./controller/userController');
require('dotenv').config();

// app.use('/', express.static(path.join(__dirname,'')))
app.use(express.json());

// app.get('/', APIController.call, APIController.instantiateTable, (req, res) => {
//   return res.status(200).send('random');
// });

// console.log('the api key is this: ', [process.env.pokeAPIKey]);
app.get('/', (req, res) => {
  res.status(200).send('helloo world!');
});

app.get('/hello', (req, res) => {
  console.log('made a request');
  res.status(200).send('hello I am a response');
});

app.post('/signup', userController.createUser, (req, res) => {
  console.log('successfully created user');
  res.status(200).send(res.locals.newUser);
});
// serves client request for a card
app.post('/getPokemon', APIController.pokemonAPIQuery, (req, res) => {
  // if the SQL database does not have the result, then redirect
  console.log('ending the getPoke middleware');
  if (Object.hasOwn(res.locals, 'selectedPokemon')) {
    return res.status(200).json(res.locals.selectedPokemon);
  } else {
    return res.status(404).redirect('/');
  }
});

app.post('/login', userController.getUser, (req, res) => {
  console.log('found user in database');
  res.status(200).json(res.locals);
});

app.post('/save', userController.saveUser, (req, res) => {
  res.status(200).send(res.locals.message);
});

app.use('*', (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error global occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

const appserver = app.listen(PORT, () => {
  console.log('listening on a port:', PORT);
});

module.exports = appserver;
