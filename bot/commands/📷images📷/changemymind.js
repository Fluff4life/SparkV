const Discord = require(`discord.js`);

exports.run = async (bot, message, args, command, data) => {
  if (bot.config.Debug.Enabled === true) {
    return;
  }

  if (!args || !args[0]) {
    return message.reply(`Please provide text.`);
  }

  const canvacord = require(`canvacord`);

  args = args.join(` `);

  const Image = await canvacord.Canvas.changemymind(args);
  const ChangeMyMind = new Discord.MessageAttachment(Image, `changemymind.gif`);

  message.reply(ChangeMyMind);
};
  exports.config = {
    name: `ChangeMyMind`,
    description: `AAAAAAAAAAAAAAAAAAAAAAAAAAAH!`,
    aliases: [`cmm`],
    usage: `<text>`,
    category: `📷images📷`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
    member_permissions: [],
    enabled: true,
    cooldown: 2
};
