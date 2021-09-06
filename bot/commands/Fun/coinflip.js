const Discord = require("discord.js");

const Replies = ["Heads", "Tails"];

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const ReplyText = Math.floor(Math.random() * Replies.length);

  return message.reply(`My coin flipped ${Replies[ReplyText]}!`);
}

module.exports = new cmd(execute, {
  description: "I have no bias! I swear noob!1!",
  dirname: __dirname,
  aliases: ["CF"],
  usage: ``,
});
