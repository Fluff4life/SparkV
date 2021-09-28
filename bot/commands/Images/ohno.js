const Discord = require("discord.js");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const canvacord = require("canvacord");

  args = args.join(" ");

  const Image = await canvacord.Canvas.ohno(args);
  const OhNo = new Discord.MessageAttachment(Image, "ohno.png");

  message.reply({
    attachments: OhNo
  });
}

module.exports = new cmd(execute, {
  description: "OH NO HE'S STUPID!",
  aliases: ["stupid"],
  dirname: __dirname,
  usage: `<text>`,
});
