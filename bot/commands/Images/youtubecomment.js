const Discord = require(`discord.js`);

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const User = (await bot.functions.GetMember(message, args)) || bot.users.cache.get(args[0]) || message.author;

  if (bot.config.debug.enabled === true) {
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
}

module.exports = new cmd(execute, {
  description: `YouTube comment lol.`,
  aliases: ["waste"],
  dirname: __dirname,
  usage: `<user | self> <text>`,
});
