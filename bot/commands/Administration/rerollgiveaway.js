const Discord = require("discord.js");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const ID = args[0];

  if (!ID || isNaN(ID)) {
    return message.reply(`Please provide a valid message ID.`);
  }

  const Giveaway = bot.GiveawayManager.giveaways.find(giveaway => giveaway.messageID === args[0]);

  if (!Giveaway) {
    return message.reply(`I couldn\'t find a giveaway with that message ID.`);
  }

  bot.GiveawayManager.reroll(Giveaway.messageID)
    .then(() => {
      message.reply("Giveaway successfully rerolled!");
    })
    .catch(err => {
      if (err.startsWith(`Giveaway with ID ${Giveaway.messageID} is not ended`)) {
        message.reply("This giveaway hasn't ended yet!");
      } else {
        console.error(err).then(() => {
          message.reply("An error occured with SparkV! Please try this command again.");
        });
      }
    });
}

module.exports = new cmd(execute, {
  description: "Rerolls a giveaway. Requires the permision MANAGE_MESSAGES.",
  dirname: __dirname,
  usage: "<MessageID>",
  aliases: ["rerollg"],
  perms: ["EMBED_LINKS", "MANAGE_MESSAGES"],
  gname: "youtube",
  type: "together",
});
