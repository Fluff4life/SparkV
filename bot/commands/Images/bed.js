const Discord = require("discord.js");

const cmd = require("../../templates/command");

async function execute(bot, message) {
  const User = (await bot.GetMember(message, args)) || bot.users.cache.get(args[0]) || message.author;

  if (bot.config.Debug.Enabled === true) {
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

  const Image = await canvacord.Canvas.bed(UserAvatar, Avatar);
  const Bed = new Discord.MessageAttachment(Image, "bed.gif");

  message.reply(Bed);
}

module.exports = new cmd(execute, {
  description: "AAAAAAAAAAAAAAAAAAAAAAAAAAAH!",
  aliases: ["underbed"],
  dirname: __dirname,
  usage: `<optional user>`,
});
