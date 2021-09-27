const Discord = require("discord.js");

const cmd = require("../../templates/command");

async function execute(bot, message) {
  const User = bot.users.cache.get(args[0]) || message.author;

  const canvacord = require("canvacord");

  const Avatar = User.displayAvatarURL({
    dynamic: false,
    format: "gif",
  });

  const Image = await canvacord.Canvas.affect(Avatar);
  const Affect = new Discord.MessageAttachment(Image, "affect.gif");

  message.reply(Affect);
}

module.exports = new cmd(execute, {
  description: "Yes it does noob",
  dirname: __dirname,
  aliases: ["nope"],
  usage: `<optional user>`,
});
