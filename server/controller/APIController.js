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
  console.log('reqest body', req.body);
  if (!Object.hasOwn(res.locals, 'selectedPokemon')) {
    // queries the API
    console.log('API querying the api for', req.body.name);
    pokemon.card
      .where({ q: `name:${req.body.name}` })
      .then((result) => {
        // currently taking the first result from the API response
        if (result.data[0]) {
          let r = result.data[0];
          const data = {
            name: r.name,
            types: r.types,
            hp: r.hp,
            cardmarket: r.cardmarket,

            images: r.images,
          };

          // assign it to res.locals.selectedPokemon
          res.locals.selectedPokemon = data;
        } else {
          next({
            log: 'card result not found',
            message: 'card not found',
          });
        }
        next();
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
};

APIController.getData = (req, res, next) => {
  const name = req.body.name;
  console.log('name is currently: ', name);
  const str = `SELECT * FROM pokemonTable WHERE pokemon_name = '${name}'`;
  db.query(str)
    //.then(data => console.log(data))
    .then((data) => data.rows[0])
    .then((data) => {
      //console.log("DATA: ", data)
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
      // console.log("log this: ", res.locals.selectedPokemon)
      return next();
    })
    .catch((err) => {
      const errorObj = {
        log: 'Couldnt get this pokemon',
        status: 400,
        message: 'Uh oh! Couldnt get this pokemon',
      };
      // set to redirect instead
      // return next(errorObj);
      res.locals.redirectToAPI = true;
      next();
    });
};

module.exports = APIController;
