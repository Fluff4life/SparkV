const Discord = require("discord.js");

exports.run = async (bot, message) => {
  const User = (await bot.GetMember(message, args)) || bot.users.cache.get(args[0]) || message.author;

    if (bot.config.Debug.Enabled === true) {
        return;
    }

    const canvacord = require("canvacord");

  const Avatar = message.author.displayAvatarURL({
    dynamic: false,
    format: "gif",
  });

  const UserAvatar = User.displayAvatarURL({
    dynamic: false,
    format: "gif",
  });

    const Image = await canvacord.Canvas.bed(UserAvatar, Avatar);
    const Bed = new Discord.MessageAttachment(Image, "bed.gif");

    message.reply(Bed);
};
exports.config = {
  name: "Bed",
  description: "AAAAAAAAAAAAAAAAAAAAAAAAAAAH!",
  aliases: ["underbed"],
  usage: "<<optional user>>",
  category: "📷Images📷",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 2,
};
