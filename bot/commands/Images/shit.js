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

  const Image = await canvacord.Canvas.shit(Avatar);
  const Shit = new Discord.MessageAttachment(Image, "shit.gif");

  message.reply(Shit);
}

module.exports = new cmd(execute, {
  description: "Ewwwwww!",
  aliases: ["crap"],
  dirname: __dirname,
  usage: `<user | self>`,
});
