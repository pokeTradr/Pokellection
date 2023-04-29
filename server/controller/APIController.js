const fetch = require('node-fetch')

const APIController = {};

APIController.call = (req, res, next) => {
  fetch('https://api.pokemontcg.io/v2/cards/')
  .then(data => data.json())
  .then(data => {
    res.locals.pokemonData = data;
    return next();
  })
  .catch((err) => {
    const errorObj = {
      log: 'Pokemon data not fetched properly',
      status: 400,
      message: 'Uh oh! Your pokemon data was not fetched properly'
    }
    return next(errorObj);
  })
}

APIController.instantiateTable = (req, res, next) => {

}



module.exports = APIController;

