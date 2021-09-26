const Discord = require("discord.js");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const User = (await bot.functions.GetMember(message, args)) || bot.users.cache.get(args[0]) || message.author;

  if (bot.config.debug.enabled === true) {
    return;
  }

  const canvacord = require("canvacord");

  const Avatar = User.displayAvatarURL({
    dynamic: false,
    format: "gif",
  });

  const Image = await canvacord.Canvas.trash(Avatar);
  const Trash = new Discord.MessageAttachment(Image, "trash.gif");

  message.reply(Trash);
}

module.exports = new cmd(execute, {
  description: "Ug trash.",
  aliases: ["punch"],
  dirname: __dirname,
  usage: `<user | self>`,
});
