const fetch = require("node-fetch");

const pokemonModel = require("../Models/pokemonSchema");

module.exports = {
  name: "addpokemon",
  aliases: [],
  permissions: [],
  description: "Add pokemon to the db team",
  async execute(client, message, args, Discord, profileData) {
    let data;

    const url = "https://pokeapi.co/api/v2/pokedex/1";
    await fetch(url)
      .then((res) => res.json())
      .then((body) => (data = body.pokemon_entries));

    for (let i = 0; i < data.length; i++) {
      let entry = data[i];
      try {
        let pkmnInfo = await pokemonModel.findOne({
          name: entry.pokemon_species.name,
        });
        if (!pkmnInfo) {
          let profile = await pokemonModel.create({
            pokedex: entry.entry_number,
            name: entry.pokemon_species.name,
            url: entry.pokemon_species.url,
          });
          profile.save();
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
};
