const Discord = require("discord.js");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const User = bot.users.cache.get(args[0]) || message.author;

  const canvacord = require("canvacord");

  const Avatar = User.displayAvatarURL({
    dynamic: false,
    format: "gif",
  });

  const Image = await canvacord.Canvas.trigger(Avatar);
  const Triggered = new Discord.MessageAttachment(Image, "triggered.gif");

  message.reply({
    attachments: [Triggered]
  });
}

module.exports = new cmd(execute, {
  description: "wow you mad bro",
  aliases: ["mad"],
  dirname: __dirname,
  usage: `<user | self>`,
});
