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

  const Image = await canvacord.Canvas.rip(Avatar);
  const Rip = new Discord.MessageAttachment(Image, "rip.gif");

  message.reply(Rip);
};
  exports.config = {
    name: "Rip",
    description: "RIP",
    aliases: [],
    usage: "<optional user>",
    category: "📷images📷",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 2
};
