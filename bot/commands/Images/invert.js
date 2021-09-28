const Discord = require("discord.js");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const User = bot.users.cache.get(args[0]) || message.author;



  const canvacord = require("canvacord");

  const Avatar = User.displayAvatarURL({
    dynamic: false,
    format: "gif",
  });

  const Image = await canvacord.Canvas.invert(Avatar);
  const Invert = new Discord.MessageAttachment(Image, "invert.gif");

  message.reply({
    attachments: [Invert]
  });
}

module.exports = new cmd(execute, {
  description: "bruh",
  aliases: ["flipcolor"],
  dirname: __dirname,
  usage: `<optional user>`,
});
