const Discord = require("discord.js");

exports.run = async (bot, message) => {
  const User = await bot.GetMember(message, args) || bot.users.cache.get(args[0]) || message.author;

  if (bot.config.Debug.Enabled === true) {
    return;
  }

  const canvacord = require("canvacord");

  const Avatar = User.displayAvatarURL({
    dynamic: false,
    format: "gif"
  });

  const Image = await canvacord.Canvas.affect(Avatar);
  const Affect = new Discord.MessageAttachment(Image, "affect.gif");

  message.reply(Affect);
},

  exports.config = {
    name: "Affect",
    description: "Yes it does noob",
    aliases: ["nope"],
    usage: "<optional user>",
    category: "📷Images📷",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 2
};
