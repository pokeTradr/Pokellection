const express = require('express');
const router = express.Router();

const APIController = require('../controller/APIController')

router.post(
    '/',
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

module.exports = router