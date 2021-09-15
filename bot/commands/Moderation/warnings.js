const cmd = require("../../templates/modCommand");

async function execute(bot, message, args, command, data) {
  const User =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.guild.members.cache.find(
      User => User.user.username.toLowerCase() === args.slice(0).join(` `) || User.user.username === args[0],
    );

  if (!args[0]) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | Please mention someone to view their warnings!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (!args[0]) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | Please mention someone to view their warnings!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (!User) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | I cannot find that member!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  let warnings = bot.Database.get(`ServerData.${message.guild.id}.${User.id}.warnings`);

  message.reply(`${User} has **${warnings}** warnings.`);
}

module.exports = new cmd(execute, {
  description: `I'll display a user's warnings.`,
  dirname: __dirname,
  aliases: [],
  usage: `<user>`,
  perms: ["KICK_MEMBERS"],
});
