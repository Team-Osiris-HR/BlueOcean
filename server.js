const express = require('express');

const mongoose = require('mongoose');
const config = require('./db.config.js');

const db = config.DATABASE.replace(
  '-PASSWORD-',
  config.DATABASE_PASSWORD
);

mongoose.connect(db).then(() => {
  console.log('db connected');
});

const app = express();
app.use(express.static('dist'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});