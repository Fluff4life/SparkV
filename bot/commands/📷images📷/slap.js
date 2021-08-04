const Discord = require("discord.js");

exports.run = async (bot, message) => {
  const User = bot.GetMember(message, args) || bot.users.cache.get(args[0]) || message.author;

  if (bot.config.Debug.Enabled === true) {
    return;
  }

  const canvacord = require("canvacord");

  const Avatar = message.author.displayAvatarURL({
    dynamic: false,
    format: "gif"
});

  const UserAvatar = User.displayAvatarURL({
    dynamic: false,
    format: "gif"
});

  const Image = await canvacord.Canvas.slap(Avatar, UserAvatar);
  const Slap = new Discord.MessageAttachment(Image, "slap.gif");

  message.reply(Slap);
};
  exports.config = {
    name: "Slap",
    description: "SLAP SLAP SLAP!",
    aliases: ["punch"],
    usage: "<optional user>",
    category: "📷images📷",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 2
};
