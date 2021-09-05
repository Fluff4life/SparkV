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

  args = args.join(` `);

  const Avatar = User.displayAvatarURL({
    dynamic: false,
    format: `png`,
  });

  const Image = await canvacord.Canvas.opinion(Avatar, args);
  const Opinion = new Discord.MessageAttachment(Image, `opinion.png`);

  message.reply(Opinion);
};
exports.config = {
  name: `Opinion`,
  description: `lol`,
  aliases: [`nofact`],
  usage: `<text>`,
  category: `📷Images📷`,
  bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
  member_permissions: [],
  enabled: true,
  cooldown: 2,
};
