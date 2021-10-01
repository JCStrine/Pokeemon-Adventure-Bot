const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
  pokedex: { type: String, require: true, unique: true },
  name: { type: String, require: true, unique: true },
  url: { type: String, require: true, unique: true },
});

const model = mongoose.model("PokemonModels", pokemonSchema);

module.exports = model;
