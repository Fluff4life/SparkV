const Discord = require("discord.js");

const cmd = require("../../templates/command");

module.exports = new cmd(
  (bot, message) => {
    message.reply(`${bot.config.Emojis.error} | You don't have a job noob. You have to go get one to work lol.`);
  },
  {
    description: "Work for your job and earn some Ch1llBucks.",
    dirname: __dirname,
    aliases: ["job"],
    usage: ``,
  },
);
