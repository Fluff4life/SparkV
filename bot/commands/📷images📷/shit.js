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

  const Image = await canvacord.Canvas.shit(Avatar);
  const Shit = new Discord.MessageAttachment(Image, "shit.gif");

  message.reply(Shit);
};
  exports.config = {
    name: "Shit",
    description: "Ewwwwww!",
    aliases: ["crap"],
    usage: "<user or self>",
    category: "📷Images📷",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 2
};
