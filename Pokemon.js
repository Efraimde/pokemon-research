const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  height: Number,
  weight: Number,
  types: [String]
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;
