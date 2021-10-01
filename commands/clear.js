module.exports = {
  name: "clear",
  description: "Clear messages",
  async execute(client, message, args) {
    if (!args[0]) return message.reply("Please enter an amount");
    if (isNaN(args[0])) return message.reply("Please enter a number");
    if (args[0] > 100) return message.reply("That exceeds that maximum amount");
    if (args[0] < 1)
      return message.reply("You must delete atleast one message");

    await message.channel.messages
      .fetch({ limit: args[0] })
      .then((messages) => {
        message.channel.bulkDelete(messages);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
