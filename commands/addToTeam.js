const profileModel = require("../Models/profileSchema");
const pokemonModel = require("../Models/pokemonSchema");

module.exports = {
  name: "addtoteam",
  aliases: [],
  permissions: [],
  description: "Add a pokemon to the users team",
  async execute(client, message, args, Discord, profileData) {
    let pkmn = args[0].toLowerCase();
    if (!pkmn) return message.reply("Please enter a pokemon");
    if (isNaN(pkmn)) {
      try {
        let pkmnInfo = await pokemonModel.findOne({
          name: pkmn,
        });
        console.log(pkmnInfo);
        if (!pkmnInfo) {
          return message.reply("Please enter a valid pokemon name");
        } else if (pkmnInfo) {
          try {
            let userProfile = await profileModel.findOne({
              userID: message.author.id,
            });
            let newTeam = userProfile.team;
            if (newTeam.length == 6)
              return message.reply("Your team is already full!");
            newTeam.push(pkmnInfo);
            userProfile.updateOne({ team: newTeam }).then((res) => {
              return message.reply(`${pkmn} has been added to your team!`);
            });
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
};
