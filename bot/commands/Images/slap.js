const Discord = require("discord.js");

const cmd = require("../../templates/command");

async function execute(bot, message) {
  const User = (await bot.GetMember(message, args)) || bot.users.cache.get(args[0]) || message.author;

  if (bot.config.debug.enabled === true) {
    return;
  }

  const canvacord = require("canvacord");

  const Avatar = message.author.displayAvatarURL({
    dynamic: false,
    format: "gif",
  });

  const UserAvatar = User.displayAvatarURL({
    dynamic: false,
    format: "gif",
  });

  const Image = await canvacord.Canvas.slap(Avatar, UserAvatar);
  const Slap = new Discord.MessageAttachment(Image, "slap.gif");

  message.reply(Slap);
}

module.exports = new cmd(execute, {
  description: "SLAP SLAP SLAP!",
  aliases: ["punch"],
  dirname: __dirname,
  usage: `<user | self>`,
});
