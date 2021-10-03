const Discord = require("discord.js");
const canvacord = require("canvacord");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const User = (await bot.functions.fetchUser(args[0])) || message.author;
  const Image = await canvacord.Canvas.trash(User.displayAvatarURL({ format: "png" }));

  message.reply({
    files: [new Discord.MessageAttachment(Image, "trash.png")],
  });
}

module.exports = new cmd(execute, {
  description: "wow it trash",
  aliases: ["garbage"],
  dirname: __dirname,
  usage: `<user | self>`,
});
