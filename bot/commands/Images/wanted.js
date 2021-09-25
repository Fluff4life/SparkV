const Discord = require("discord.js");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const User = (await bot.GetMember(message, args)) || bot.users.cache.get(args[0]) || message.author;

  if (bot.config.debug.enabled === true) {
    return;
  }
  const canvacord = require("canvacord");

  const Avatar = User.displayAvatarURL({
    dynamic: false,
    format: "gif",
  });

  const Image = await canvacord.Canvas.wanted(Avatar);
  const Wanted = new Discord.MessageAttachment(Image, "wanted.gif");

  message.reply(Wanted);
}

module.exports = new cmd(execute, {
  description: "Wanted sign.",
  aliases: ["mad"],
  dirname: __dirname,
  usage: `<user | self>`,
});
