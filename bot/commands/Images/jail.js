const Discord = require("discord.js");
const canvacord = require("canvacord");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const User = (await bot.functions.fetchUser(args[0])) || message.author;
  const Image = await canvacord.Canvas.invert(User.displayAvatarURL({ format: "png" }), true);

  message.reply({
    attachments: [new Discord.MessageAttachment(Image, "jail.png")],
  });
}

module.exports = new cmd(execute, {
  description: "Haha get in jail noob",
  aliases: ["lockup"],
  dirname: __dirname,
  usage: `<optional user>`,
});
