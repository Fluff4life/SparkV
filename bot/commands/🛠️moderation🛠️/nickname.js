const Discord = require(`discord.js`);

exports.run = async (bot, message, args, command, data) => {
  const User =
    message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]) || `@<${args[0]}>`;
  const NewNickname = args.join(` `).slice(22);

  if (!args[0]) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | Please mention someone to change their nickname!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (!User) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | I cannot find that member!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (!User.roles) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | That\`s not a user! That\`s a role.`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (!NewNickname) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | Please mention their new nickname!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (User.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) {
    return message.reply(`Uh oh! I cannot change their nickname. They\`re a higher role than me!`);
  }

  const VerificationEmbed = new Discord.MessageEmbed()
    .setTitle(`Convermination Prompt`)
    .setDescription(`Are you sure you want to do this?`)
    .setFooter(`Canceling in 60 seconds if no emoji reacted • ${bot.config.bot.Embed.Footer}`);

  const VerificationMessage = await message.reply(VerificationEmbed);
  const Emoji = await bot.PromptMessage(
    VerificationMessage,
    message.author,
    [bot.config.bot.Emojis.success, bot.config.bot.Emojis.error],
    60,
  );

  if (Emoji === bot.config.bot.Emojis.success) {
    // Yes
    message.delete();
    VerificationMessage.delete();

    User.setNickname(NewNickname)
      .then(() => {
        message.reply(
          `${bot.config.bot.Emojis.success} | I successfully changed ${User}\`s nickname to ${NewNickname}!`,
        );
      })
      .catch(err => {
        message.reply(`${bot.config.bot.Emojis.error} | Uh oh! I cannot change their nickname.`).then(() => {
          console.error(err);
        });
      });
  } else if (emoji === bot.config.bot.Emojis.error) {
    message.delete();

    message.reply(`${bot.config.bot.Emojis.error} | Nickname change canceled.`).then(m => m.delete({ timeout: 10000 }));
  }
};
  exports.config = {
    name: `Nickname`,
    description: `I\'ll change a user\'s nickname to your choice.`,
    aliases: [`setnick`],
    usage: `<user> <reason>`,
    category: `🛠️moderation🛠️`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`, `CHANGE_NICKNAME`],
    member_permissions: [`CHANGE_NICKNAME`, `MANAGE_GUILD`],
    enabled: true,
    cooldown: 5
};
