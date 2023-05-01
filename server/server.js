const express = require('express');
const path = require('path');
const APIController = require('./controller/APIController');
const app = express();
const PORT = 3000;

// app.use('/', express.static(path.join(__dirname,'')))
app.use(express.json());

app.get('/', APIController.call, APIController.instantiateTable, (req, res) => {
  return res.status(200).send('random');
});

// waylnd - test out the npm based API calls
app.post('/queryPokemonAPI', APIController.pokemonAPIQuery, (req, res) => {
  // gets redirected to if the SQL db query fails

  // build up and returnt the response object in the expected format
  let r = res.locals.pokemonCardResult;
  const data = {
    name: r.name,
    types: r.types,
    hp: r.hp,
    cardmarket: r.cardmarket,

    images: r.images,
  };
  res.status(200).json(data);
});

app.post('/getPokemon', APIController.getData, (req, res) => {
  return res.status(200).json(res.locals.selectedPokemon);
});

app.get('/hello', (req, res) => {
  console.log('made a request');
  res.status(200).send('hello I am a response');
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
