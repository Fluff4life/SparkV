const Discord = require("discord.js");
const canvacord = require("canvacord");

const cmd = require("../../templates/command");

async function execute(bot, message, args) {
  const User = (await bot.functions.fetchUser(args[0])) || message.author;
  const Image = await canvacord.Canvas.rainbow(User.displayAvatarURL({ format: "png" }));

  message.reply({
    files: [new Discord.MessageAttachment(Image, "rainbow.png")],
  });
}

module.exports = new cmd(execute, {
  description: `wow bro are you gae?`,
  aliases: ["colorful"],
  dirname: __dirname,
  usage: `<optional user>`,
});
