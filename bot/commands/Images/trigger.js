const Discord = require("discord.js");
const canvacord = require("canvacord");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const User = (await bot.functions.fetchUser(args[0])) || message.author;
  const Image = await canvacord.Canvas.trigger(User.displayAvatarURL({ format: "png" }));

  message.reply({
    attachments: [new Discord.MessageAttachment(Image, "trigger.png")],
  });
}

module.exports = new cmd(execute, {
  description: "wow you mad bro",
  aliases: ["mad"],
  dirname: __dirname,
  usage: `<user | self>`,
});
