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

    args = args.join(` `).slice(22);

<<<<<<< HEAD
  const Avatar = User.displayAvatarURL({
    dynamic: false,
    format: `gif`,
  });

  const Image = await canvacord.Canvas.youtube({
    username: User.username,
    avatar: Avatar,
    content: args,
  });
=======
    const Avatar = User.displayAvatarURL({
        dynamic: false,
        format: `gif`,
    });

    const Image = await canvacord.Canvas.youtube({
        username: User.username,
        avatar: Avatar,
        content: args,
    });
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89

    const YouTube = new Discord.MessageAttachment(Image, `youtube.gif`);

    message.reply(YouTube);
};
exports.config = {
<<<<<<< HEAD
  name: `YouTubeComment`,
  description: `YouTube comment lol.`,
  aliases: [],
  usage: `<optional user> <text>`,
  category: `📷Images📷`,
  bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
  member_permissions: [],
  enabled: true,
  cooldown: 2,
=======
    name: `YouTubeComment`,
    description: `YouTube comment lol.`,
    aliases: [],
    usage: `<optional user> <text>`,
    category: `📷Images📷`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
    member_permissions: [],
    enabled: true,
    cooldown: 2,
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
};
