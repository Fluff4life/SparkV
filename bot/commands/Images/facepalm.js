const Discord = require("discord.js");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const User = bot.users.cache.get(args[0]) || message.author;


  const canvacord = require("canvacord");

  const Avatar = User.displayAvatarURL({
    dynamic: false,
    format: "gif",
  });

  const Image = await canvacord.Canvas.facepalm(Avatar);
  const FacePalm = new Discord.MessageAttachment(Image, "facepalm.gif");

  message.reply({
    attachments: [FacePalm]
  });
}

module.exports = new cmd(execute, {
  description: "bruh",
  aliases: ["ow"],
  dirname: __dirname,
  usage: `<optional user>`,
});
