const Discord = require("discord.js");
const canvacord = require("canvacord");

const cmd = require("../../templates/command");

async function execute(bot, message) {
  const User = (await bot.functions.fetchUser(args[0])) || message.author;

  const Image = await canvacord.Canvas.affect(User.displayAvatarURL({ format: "png" }));

  message.reply({
    attachments: [new Discord.MessageAttachment(Image, "affect.png")],
  });
}

module.exports = new cmd(execute, {
  description: "Yes it does noob",
  dirname: __dirname,
  aliases: ["nope"],
  usage: `<optional user>`,
});
