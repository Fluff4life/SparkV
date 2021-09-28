const Discord = require("discord.js");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const User = bot.users.cache.get(args[0]) || message.author;



  const canvacord = require("canvacord");

  const Avatar = User.displayAvatarURL({
    dynamic: false,
    format: "gif",
  });

  const Image = await canvacord.Canvas.wasted(Avatar);
  const Wasted = new Discord.MessageAttachment(Image, "wasted.gif");

  message.reply({
    attachments: [Wasted]
  });
}

module.exports = new cmd(execute, {
  description: "Dang man, that's a life wasted.",
  aliases: ["waste"],
  dirname: __dirname,
  usage: `<user | self>`,
});
