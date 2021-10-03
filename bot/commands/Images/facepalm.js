const Discord = require("discord.js");
const canvacord = require("canvacord");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const User = (await bot.functions.fetchUser(args[0])) || message.author;
  const Image = await canvacord.Canvas.facepalm(User.displayAvatarURL({ format: "png" }));

  await message.replyT({
    files: [new Discord.MessageAttachment(Image, "facepalm.png")],
  });
}

module.exports = new cmd(execute, {
  description: "bruh",
  aliases: ["ow"],
  dirname: __dirname,
  usage: `<optional user>`,
});
