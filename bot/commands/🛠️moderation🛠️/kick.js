const Discord = require(`discord.js`);

exports.run = async (bot, message, args, command, data) => {
  const UserToKick =
    message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]) || `@<${args[0]}>`;
  const ReasonForKick = args.join(` `).slice(22) || `No reason provided.`;

  if (!args[0]) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | Please mention someone to kick!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (!UserToKick) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | I cannot find that member!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (UserToKick.id === message.author.id) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | You cannot kick yourself.`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (!UserToKick.kickable) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | Uh oh... I can't kick this user!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  const VerificationEmbed = new Discord.MessageEmbed()
    .setTitle(`Convermination Prompt`)
    .setDescription(`Are you sure you want to do this?`)
    .setFooter(`Canceling in 60 seconds if no emoji reacted. • ${bot.config.bot.Embed.Footer}`);

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

    UserToKick.kick().catch(err => {
      message.reply(`${bot.config.bot.Emojis.error} | Failed to kick. Error: ${err}`);
    });

    try {
      UserToKick.send(
        `${bot.config.bot.Emojis.error} | You have been kicked from ${message.guild.name}. Reason: ${ReasonForKick}.`,
      );
    } catch (err) {}

    const KickEmbend = new Discord.MessageEmbed()
      .setTitle(`Kick Command`)
      .setDescription(`${bot.config.bot.Emojis.success} | Successfully kicked <@${UserToKick.id}>(${UserToKick.id})!`)
      .setThumbnail(UserToKick.avatar)
      .addField(`Moderator/Admin: `, `${message.author.tag}`)
      .addField(`Reason: `, ReasonForKick)
      .setFooter(`${bot.config.bot.prefix}Ban to ban a user. • ${bot.config.bot.Embed.Footer}`)
      .setColor(bot.config.bot.Embed.Color)
      .setTimestamp();

    message.reply(KickEmbend);
  } else if (emoji === bot.config.bot.Emojis.error) {
    message.delete();

    message.reply(`${bot.config.bot.Emojis.error} | Kick canceled.`).then(m => m.delete({ timeout: 10000 }));
  }
};
  exports.config = {
    name: `Kick`,
    description: `Is a user bothering you? Using this command, you can kick them from the server!`,
    aliases: [],
    usage: `<user> <optional user>`,
    category: `🛠️moderation🛠️`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`, `MANAGE_MESSAGES`, `KICK_MEMBERS`],
    member_permissions: [`KICK_MEMBERS`],
    enabled: true,
    cooldown: 5
};
