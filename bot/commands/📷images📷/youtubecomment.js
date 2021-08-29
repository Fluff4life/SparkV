const Discord = require(`discord.js`);

exports.run = async (bot, message, args, command, data) => {
  const User = (await bot.GetMember(message, args)) || bot.users.cache.get(args[0]) || message.author;

  if (bot.config.Debug.Enabled === true) {
    return;
  }

  if (!args || !args[0]) {
    return message.reply(`Please provide text.`);
  }

  const canvacord = require(`canvacord`);

  args = args.join(` `).slice(22);

  const Avatar = User.displayAvatarURL({
    dynamic: false,
    format: `gif`,
  });

  const Image = await canvacord.Canvas.youtube({
    username: User.username,
    avatar: Avatar,
    content: args,
  });

  const YouTube = new Discord.MessageAttachment(Image, `youtube.gif`);

  message.reply(YouTube);
};
exports.config = {
  name: `YouTubeComment`,
  description: `YouTube comment lol.`,
  aliases: [],
  usage: `<optional user> <text>`,
  category: `📷Images📷`,
  bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
  member_permissions: [],
  enabled: true,
  cooldown: 2,
};
