const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// app.use('/', express.static(path.join(__dirname,'')))

app.get('/hello', (req, res) => {
  console.log('made a request');
  res.status(200).send('hello I am a response');
});

app.listen(PORT, () => {
  console.log('listening on a port:', PORT);
});
