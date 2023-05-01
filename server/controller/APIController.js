const fetch = require('node-fetch');
const db = require('../models/pokemon_model');
const pokemon = require('pokemontcgsdk');
const akey = require('./config');
pokemon.configure(akey);

const APIController = {};

APIController.call = (req, res, next) => {
  fetch('https://api.pokemontcg.io/v2/cards/')
    .then((data) => data.json())
    .then((data) => {
      res.locals.pokemonData = data;
      return next();
    })
    .catch((err) => {
      const errorObj = {
        log: 'Pokemon data not fetched properly',
        status: 400,
        message: 'Uh oh! Your pokemon data was not fetched properly',
      };
      return next(errorObj);
    });
};

APIController.instantiateTable = (req, res, next) => {
  const data = res.locals.pokemonData.data;
  console.log('length: ', data.length);
  const newData = [];
  for (let i = 0; i < 150; i++) {
    str = `INSERT INTO pokemonTable (pokemon_name, pokemon_type, hp, marketPrice, updatedDate, img) VALUES ('${data[i].name}', '${data[i].types[0]}',${data[i].hp}, ${data[i].cardmarket.prices.averageSellPrice}, '${data[i].cardmarket.updatedAt}', '${data[i].images.small}')`;
    newData.push(str);
  }
  async function queryDB(arr) {
    for (const el of arr) {
      try {
        await db.query(el);
      } catch {
        console.log(el);
        continue;
      }
    }
  }
  queryDB(newData);
  return next();

  // let str = `INSERT INTO pokemonTable (pokemon_name, pokemon_type, hp, marketPrice, updatedDate, img) VALUES `
  // console.log(data[0])

  // for (let i = 0; i < 25; i++) {
  //   if (i === 24){
  //     str += `('${data[i].name}', '${data[i].types[0]}',${data[i].hp}, '${data[i].cardmarket.prices.averageSellPrice}', '${data[i].cardmarket.updatedAt}', '${data[i].images.small}');`
  //     console.log(str)
  //   }
  //   else{
  //     str += `('${data[i].name}', '${data[i].types[0]}',${data[i].hp}, '${data[i].cardmarket.prices.averageSellPrice}', '${data[i].cardmarket.updatedAt}', '${data[i].images.small}'),`
  //     console.log(str)
  //   }
  //   console.log(str)
  // }
  // db.query(str, (err, results) => {
  //   if (err) {
  //     const newErr =
  //     {
  //       log: 'Express error while inserting pokemon from API',
  //       status: 400,
  //       message: { err: 'Express error while inserting pokemon from API' },
  //     };
  //     console.log(err);
  //     return next(newErr);
  //   }
  // })

  // console.log("COMPLETE!")

  //return next();
};

APIController.pokemonAPIQuery = (req, res, next) => {
  // if the response doesn't yet have the result
  console.log('in the test route');
  console.log('reqest body', req.body);
  if (!Object.hasOwn(res.locals, 'pokemonCardResult')) {
    // queries the API
    console.log('querying the api');
    pokemon.card
      .where({ q: `name:${req.body.name}` })
      .then((result) => {
        // currently taking the first result from the API response
        if (result.data[0]) {
          res.locals.pokemonCardResult = result.data[0];
        } else {
          next({
            log: 'card result not found',
            message: 'card not found',
          });
        }

        // console.log(res.locals.pokemonCardResult); // "Blastoise"
        next();
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
};

module.exports = APIController;
