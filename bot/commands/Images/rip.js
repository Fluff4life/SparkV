const Discord = require("discord.js");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const User = (await bot.functions.fetchUser(args[0])) || message.author;
  const Image = await canvacord.Canvas.rip(User.displayAvatarURL({ format: "png" }));

  message.reply({
    attachments: [new Discord.MessageAttachment(Image, "rainbow.png")],
  });
}

module.exports = new cmd(execute, {
  description: `Rest In Peace.`,
  aliases: [],
  dirname: __dirname,
  usage: `<optional user>`,
});
