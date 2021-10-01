module.exports = {
  name: "team",
  aliases: [],
  permissions: [],
  description: "Show the users team",
  execute(client, message, args, Discord, profileData) {
    const arr = [];
    profileData.team.forEach((element) => {
      arr.push(element.name);
    });
    let str = arr.join(", ");
    console.log(str, arr);
    message.reply(`Your team is comprised of: ${str}`);
  },
};
