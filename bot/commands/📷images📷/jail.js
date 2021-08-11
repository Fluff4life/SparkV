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

  const Image = await canvacord.Canvas.jail(Avatar, true);
  const Jail = new Discord.MessageAttachment(Image, "jail.gif");

  message.reply(Jail);
};
  exports.config = {
    name: "Jail",
    description: "Haha get in jail noob",
    aliases: ["lockup"],
    usage: "<optional user>",
    category: "📷Images📷",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 2
};
