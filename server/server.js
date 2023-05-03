const express = require('express');
const path = require('path');
const APIController = require('./controller/APIController');
const app = express();
const PORT = 3000;
const userController = require('./controller/userController');
require('dotenv').config();

// app.use('/', express.static(path.join(__dirname,'')))
app.use(express.json());

// app.get('/', APIController.call, APIController.instantiateTable, (req, res) => {
//   return res.status(200).send('random');
// });

// console.log('the api key is this: ', [process.env.pokeAPIKey]);

// serves client request for a card
app.post(
  '/getPokemon',
  APIController.getData,
  APIController.pokemonAPIQuery,
  (req, res) => {
    // if the SQL database does not have the result, then redirect
    console.log('ending the getPoke middleware');
    if (Object.hasOwn(res.locals, 'selectedPokemon')) {
      return res.status(200).json(res.locals.selectedPokemon);
    } else {
      return res.status(404).redirect('/');
    }
  }
);

app.get('/hello', (req, res) => {
  console.log('made a request');
  res.status(200).send('hello I am a response');
});

app.post('/signup', userController.createUser, (req, res) => {
  console.log('IS THISW ROKING');
  res.status(200).send(res.locals.newUser);
});

app.post('/login', userController.getUser, (req, res) => {
  res.status(200).json(res.locals);
});

app.use('*', (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler hiiiiii caught unknown middleware error',
    status: 400,
    message: { err: 'An error global occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log('listening on a port:', PORT);
});
