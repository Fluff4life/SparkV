const Discord = require("discord.js");
const canvacord = require("canvacord");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  args = args.join(" ");

  const Image = await canvacord.Canvas.ohno(args);

  message.reply({
    attachments: [new Discord.MessageAttachment(Image, "jail.png")],
  });
}

module.exports = new cmd(execute, {
  description: "OH NO HE'S STUPID!",
  aliases: ["stupid"],
  dirname: __dirname,
  usage: `<text>`,
});
