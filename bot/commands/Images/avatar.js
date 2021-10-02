const Discord = require("discord.js");
const canvacord = require("canvacord");

const cmd = require("../../templates/command");

async function execute(bot, message) {
  const User = await bot.functions.fetchUser(args[0]) || message.author;
  const avatar = user.displayAvatarURL({ dynamic: true, format: "png" });

  if (message.content.includes("-url")) {
    message.reply(`URL: <${avatar}>`);
  }

  message.reply({
    attachments: [new Discord.MessageAttachment(avatar, `${User.tag}-avatar.png`)]
  });
}

module.exports = new cmd(execute, {
  description: "4K avatar 512x512",
  dirname: __dirname,
  aliases: [],
  usage: `<user | self>`,
});
