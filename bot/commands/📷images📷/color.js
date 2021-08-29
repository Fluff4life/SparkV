const Discord = require(`discord.js`);

exports.run = async (bot, message, args, command, data) => {
    if (!args || !args[0]) {
        return message.reply(
            `Please provide a valid HEX color code. Example: #ff0000.`
        );
    }

    const canvacord = require(`canvacord`);

    args = args.join(` `);

    const Image = await canvacord.Canvas.color(`#${args}`);
    const Color = new Discord.MessageAttachment(Image, `color.png`);

    message.reply(Color);
};
exports.config = {
<<<<<<< HEAD
  name: `Color`,
  description: `Hex to color.`,
  aliases: [],
  usage: `<HEX>`,
  category: `📷Images📷`,
  bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
  member_permissions: [],
  enabled: true,
  cooldown: 1.5,
=======
    name: `Color`,
    description: `Hex to color.`,
    aliases: [],
    usage: `<HEX>`,
    category: `📷Images📷`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
    member_permissions: [],
    enabled: true,
    cooldown: 1.5,
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
};
