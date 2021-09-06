const Discord = require(`discord.js`);

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
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
}

module.exports = new cmd(execute, {
  description: `lol`,
  aliases: ["nofact"],
  dirname: __dirname,
  usage: `<text>`,
});
