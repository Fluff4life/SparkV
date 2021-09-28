const Discord = require("discord.js");

const cmd = require("../../templates/command");

async function execute(bot, message) {
  const User = bot.users.cache.get(args[0]) || message.author;


  const canvacord = require("canvacord");

  const Avatar = User.displayAvatarURL({
    dynamic: false,
    format: "gif",
  });

  const Image = await canvacord.Canvas.opinion(Avatar);
  const Rainbow = new Discord.MessageAttachment(Image, "raindow.gif");

  message.reply({
    attachments: [Rainbow]
  });
}

module.exports = new cmd(execute, {
  description: `wow you gae`,
  aliases: ["colorful"],
  dirname: __dirname,
  usage: `<optional user>`,
});
