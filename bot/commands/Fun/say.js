const Discord = require("discord.js");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  args = args.join(" ");

  message.channel.send(`${args}\n*-${message.author.username}*`);
  message.delete().catch(_ => {});
}

module.exports = new cmd(execute, {
  description: "I will say whatever you want me to say.",
  aliases: [],
  dirname: __dirname,
  usage: `<message>`,
});
