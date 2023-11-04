const express = require('express');
const knex = require('knex');
const knexfile = require('./knexfile');

const app = express();
const PORT = 3000;

// Create a Knex.js instance
const db = knex(knexfile.development);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});