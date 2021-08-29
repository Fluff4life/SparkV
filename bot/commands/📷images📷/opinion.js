const Discord = require(`discord.js`);

exports.run = async (bot, message, args, command, data) => {
<<<<<<< HEAD
  const User = (await bot.GetMember(message, args)) || bot.users.cache.get(args[0]) || message.author;
=======
    const User =
        (await bot.GetMember(message, args)) ||
        bot.users.cache.get(args[0]) ||
        message.author;
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89

    if (bot.config.Debug.Enabled === true) {
        return;
    }

    if (!args || !args[0]) {
        return message.reply(`Please provide text.`);
    }

    const canvacord = require(`canvacord`);

    args = args.join(` `);

<<<<<<< HEAD
  const Avatar = User.displayAvatarURL({
    dynamic: false,
    format: `png`,
  });
=======
    const Avatar = User.displayAvatarURL({
        dynamic: false,
        format: `png`,
    });
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89

    const Image = await canvacord.Canvas.opinion(Avatar, args);
    const Opinion = new Discord.MessageAttachment(Image, `opinion.png`);

    message.reply(Opinion);
};
exports.config = {
<<<<<<< HEAD
  name: `Opinion`,
  description: `lol`,
  aliases: [`nofact`],
  usage: `<text>`,
  category: `📷Images📷`,
  bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
  member_permissions: [],
  enabled: true,
  cooldown: 2,
=======
    name: `Opinion`,
    description: `lol`,
    aliases: [`nofact`],
    usage: `<text>`,
    category: `📷Images📷`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
    member_permissions: [],
    enabled: true,
    cooldown: 2,
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
};
