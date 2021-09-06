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

  const Image = await canvacord.Canvas.jail(Avatar, true);
  const Jail = new Discord.MessageAttachment(Image, "jail.gif");

  message.reply(Jail);
}

module.exports = new cmd(execute, {
  description: "Haha get in jail noob",
  aliases: ["lockup"],
  dirname: __dirname,
  usage: `<optional user>`,
});
