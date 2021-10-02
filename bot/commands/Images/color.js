const Discord = require(`discord.js`);

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  if (!args || !args[0]) {
    return message.reply(`Please provide a valid HEX color code. Example: #ff0000.`);
  }

  const canvacord = require(`canvacord`);

  args = args.join(` `);

  const Image = await canvacord.Canvas.color(`#${args}`);
  const Color = new Discord.MessageAttachment(Image, `color.png`);

  message.reply({
    attachments: [Color],
  });
}

module.exports = new cmd(execute, {
  description: `Hex to color.`,
  aliases: [],
  dirname: __dirname,
  usage: `<hex>`,
});
