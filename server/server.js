const express = require("express");
const path = require("path");
const APIController = require('./controller/APIController')
const app = express();
const PORT = 3000;

// app.use('/', express.static(path.join(__dirname,'')))

app.get(
  "/",
  APIController.call,
  (req, res) => {
    return res.status(200).json(res.locals.pokemonData)
  }
);

app.get("/hello", (req, res) => {
  console.log("made a request");
  res.status(200).send("hello I am a response");
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

app.listen(PORT, () => {
  console.log("listening on a port:", PORT);
});