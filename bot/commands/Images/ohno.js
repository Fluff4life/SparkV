const Discord = require("discord.js");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  if (bot.config.Debug.Enabled === true) {
    return;
  }

  const canvacord = require("canvacord");

  args = args.join(" ");

  const Image = await canvacord.Canvas.ohno(args);
  const OhNo = new Discord.MessageAttachment(Image, "ohno.png");

  message.reply(OhNo);
}

module.exports = new cmd(execute, {
  description: "OH NO HE'S STUPID!",
  aliases: ["stupid"],
  dirname: __dirname,
  usage: `<text>`,
});
