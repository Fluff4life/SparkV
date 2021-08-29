const Discord = require("discord.js");

exports.run = async (bot, message) => {
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

    const canvacord = require("canvacord");

<<<<<<< HEAD
  const Avatar = message.author.displayAvatarURL({
    dynamic: false,
    format: "gif",
  });

  const UserAvatar = User.displayAvatarURL({
    dynamic: false,
    format: "gif",
  });
=======
    const Avatar = message.author.displayAvatarURL({
        dynamic: false,
        format: "gif",
    });

    const UserAvatar = User.displayAvatarURL({
        dynamic: false,
        format: "gif",
    });
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89

    const Image = await canvacord.Canvas.bed(UserAvatar, Avatar);
    const Bed = new Discord.MessageAttachment(Image, "bed.gif");

    message.reply(Bed);
};
exports.config = {
<<<<<<< HEAD
  name: "Bed",
  description: "AAAAAAAAAAAAAAAAAAAAAAAAAAAH!",
  aliases: ["underbed"],
  usage: "<<optional user>>",
  category: "📷Images📷",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 2,
=======
    name: "Bed",
    description: "AAAAAAAAAAAAAAAAAAAAAAAAAAAH!",
    aliases: ["underbed"],
    usage: "<<optional user>>",
    category: "📷Images📷",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 2,
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
};
