const Discord = require("discord.js");

exports.run = async (bot, message, args, command, data) => {
  const User = (await bot.GetMember(message, args)) || bot.users.cache.get(args[0]) || message.author;

    if (bot.config.Debug.Enabled === true) {
        return;
    }

    const canvacord = require("canvacord");

  const Avatar = User.displayAvatarURL({
    dynamic: false,
    format: "gif",
  });

    const Image = await canvacord.Canvas.trash(Avatar);
    const Trash = new Discord.MessageAttachment(Image, "trash.gif");

    message.reply(Trash);
};
exports.config = {
  name: "Trash",
  description: "Ug trash.",
  aliases: [],
  usage: "<optional user>",
  category: "📷Images📷",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 2,
};
