const profileModel = require("../Models/profileSchema");
const pokemonModel = require("../Models/pokemonSchema");

module.exports = {
  name: "removefromteam",
  aliases: ["rm"],
  permissions: [],
  description: "Remove a pokemon from the users team",
  async execute(client, message, args, Discord, profileData) {
    let pkmn = args[0].toLowerCase();
    if (!pkmn) return message.reply("Please enter a pokemon");
    if (isNaN(pkmn)) {
      try {
        let userProfile = await profileModel.findOne({
          userID: message.author.id,
        });
        let newTeam = userProfile.team;
        if (newTeam.length == 1) {
          return message.reply("Your team can't get any smaller");
        }
        let bool = true;
        for (let i = 0; i < newTeam.length; i++) {
          if (newTeam[i].name == pkmn) {
            newTeam.splice(i, 1);
            await userProfile.updateOne({ team: newTeam }).then((res) => {
              return message.reply(`${pkmn} has been removed from your team!`);
            });
            bool = !bool;
          }
        }
        if (bool) {
          message.reply(`There is no ${pkmn} on your team`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
};
