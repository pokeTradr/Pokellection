const fetch = require('node-fetch');
const db = require("../models/pokemon_model");

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
  const data = res.locals.pokemonData.data;
  let str = `INSERT INTO pokemonTable (pokemon_name, pokemon_type, hp, marketPrice, updatedDate, img) VALUES `
  console.log(data[0])
  
  for (let i = 0; i < 25; i++) {
    if (i === 24){
      str += `('${data[i].name}', '${data[i].types[0]}',${data[i].hp}, '${data[i].cardmarket.prices.averageSellPrice}', '${data[i].cardmarket.updatedAt}', '${data[i].images.small}');`
      console.log(str)
    }
    else{
      str += `('${data[i].name}', '${data[i].types[0]}',${data[i].hp}, '${data[i].cardmarket.prices.averageSellPrice}', '${data[i].cardmarket.updatedAt}', '${data[i].images.small}'),`
      console.log(str)
    }
    console.log(str)
  }
  db.query(str, (err, results) => {
    if (err) {
      const newErr = 
      {
        log: 'Express error while inserting pokemon from API',
        status: 400,
        message: { err: 'Express error while inserting pokemon from API' },
      };
      console.log(err);
      return next(newErr);
    }
  })
  
  console.log("COMPLETE!")

  //return next();
}



module.exports = APIController;

