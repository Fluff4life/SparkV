const Discord = require(`discord.js`);

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {


  if (!args || !args[0]) {
    return message.reply(`Please provide text.`);
  }

  const canvacord = require(`canvacord`);

  args = args.join(` `);

  const Image = await canvacord.Canvas.changemymind(args);
  const ChangeMyMind = new Discord.MessageAttachment(Image, `changemymind.gif`);

  message.reply(ChangeMyMind);
}

module.exports = new cmd(execute, {
  description: `Change my mind.`,
  aliases: ["cmm"],
  dirname: __dirname,
  usage: `<text>`,
});
