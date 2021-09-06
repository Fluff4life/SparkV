const Discord = require("discord.js");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const User = (await bot.GetMember(message, args)) || bot.users.cache.get(args[0]) || message.author;

  if (bot.config.Debug.Enabled === true) {
    return;
  }

  const canvacord = require("canvacord");

  const Avatar = User.displayAvatarURL({
    dynamic: false,
    format: "gif",
  });

  const Image = await canvacord.Canvas.rip(Avatar);
  const Rip = new Discord.MessageAttachment(Image, "rip.gif");

  message.reply(Rip);
}

module.exports = new cmd(execute, {
  description: `RIP`,
  aliases: [],
  dirname: __dirname,
  usage: `<optional user>`,
});
