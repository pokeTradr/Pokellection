const fetch = require('node-fetch');
const db = require('../models/pokemon_model');
require('dotenv').config();

const pokemon = require('pokemontcgsdk');

pokemon.configure({ apiKey: process.env.pokeAPIKey });

const APIController = {};
// vanilla request to the API
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
// initializes SQL table
APIController.instantiateTable = (req, res, next) => {
  const data = res.locals.pokemonData.data;
  // console.log('length: ', data.length);
  const newData = [];
  for (let i = 0; i < 100; i++) {
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
};

// pokemontcg npm package
APIController.pokemonAPIQuery = (req, res, next) => {
    pokemon.card
      .where({ q: `name:${req.body.name}` })
      .then((result) => {

        // result has card:
        if (result.data) {
                  const outputArr = [];

        // loop through result array
        for (let i = 0; i < result.data.length; i++) {
          const r = results.data[i];
          let currentCard = {
            name: r.name,
            types: r.types,
            hp: r.hp,
            cardmarket: r.cardmarket,
            images: r.images,
          };

          // push current card into output array
          outputArr.push(currentCard);
        }

        // assign to res.locals.selectedPokemonArr
        res.locals.selectedPokemonArr = outputArr;
        }
        
        else {
          // not an error, but there's no result at db
          return next({
            message: 'error in API request',
            log: 'error in the API req',
          });
        }
        next();
      })
      .catch((err) => {
        console.log(err);
        next({
          ...err,
          message: 'error in API request',
          log: 'error in the API req',
        });
      });
};

// sql read
APIController.getData = (req, res, next) => {
  const name = req.body.name;
  console.log('name is currently: ', name);
  const str = `SELECT * FROM pokemonTable WHERE pokemon_name ILIKE '${name}'`;
  db.query(str)
    //.then(data => console.log(data))
    .then((data) => {
      // console.log('the data', data.rows[0]);
      return data.rows[0];
    })
    .then((data) => {
      // console.log('DATA: ', data);
      const dataSample = {
        name: data.pokemon_name,
        types: [data.pokemon_type],
        hp: data.hp,
        cardmarket: {
          updatedAt: data.updateddate,
          prices: {
            averageSellPrice: data.marketprice,
          },
        },
        images: {
          small: data.img,
        },
      };
      res.locals.selectedPokemon = dataSample;
      // console.log('log this: ', res.locals.selectedPokemon);
      return next();
    })
    .catch((err) => {
      const errorObj = {
        log: 'Couldnt get this pokemon',
        status: 400,
        message: 'Uh oh! Couldnt get this pokemon',
      };
      console.log('redirecting to API req instead');
      next();
    });
};

module.exports = APIController;
