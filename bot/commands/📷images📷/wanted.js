const Discord = require("discord.js");

exports.run = async (bot, message, args, command, data) => {
  const User = bot.GetMember(message, args) || bot.users.cache.get(args[0]) || message.author;

  if (bot.config.Debug.Enabled === true) {
    return;
  }
  const canvacord = require("canvacord");

  const Avatar = User.displayAvatarURL({
    dynamic: false,
    format: "gif"
});

  const Image = await canvacord.Canvas.wanted(Avatar);
  const Wanted = new Discord.MessageAttachment(Image, "wanted.gif");

  message.reply(Wanted);
};
  exports.config = {
    name: "Wanted",
    description: "Wanted sign.",
    aliases: ["colorful"],
    usage: "<optional user>",
    category: "📷Images📷",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 2
};
