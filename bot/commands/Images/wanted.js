const Discord = require("discord.js");
const canvacord = require("canvacord");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const User = (await bot.functions.fetchUser(args[0])) || message.author;
  const Image = await canvacord.Canvas.wanted(User.displayAvatarURL({ format: "png" }));

  message.reply({
    attachments: [new Discord.MessageAttachment(Image, "wanted.png")],
  });
}

module.exports = new cmd(execute, {
  description: "Wanted sign.",
  aliases: ["mad"],
  dirname: __dirname,
  usage: `<user | self>`,
});
