const { MessageEmbed } = require(`discord.js`);

exports.run = async (bot, message, args, command, data) => {
  const UserToBan =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.guild.members.cache.find(
      User => User.user.username.toLowerCase() === args.slice(0).join(` `) || User.user.username === args[0],
    );
  const ReasonForBan = args.join(` `).slice(22) || `No reason provided.`;

  if (!args[0]) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | Please mention someone to ban!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (!UserToBan) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | I cannot find that member!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (UserToBan.id === message.author.id) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | You cannot ban yourself.`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (!UserToBan.bannable) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | Uh oh... I can\`t ban this user!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  const VerificationEmbed = new MessageEmbed()
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

  if (Emoji === bot.config.bot.Emojis.error) {
    // Yes
    message.delete();
    UserToBan.send(
      `${bot.config.bot.Emojis.error} | You have been banned from ${message.guild.name}. Reason: ${ReasonForBan}.`,
    ).catch(err => {});

    UserToBan.ban({
      reason: ReasonForBan,
    }).catch(err => {
      message.reply(`${bot.config.bot.Emojis.error} | Failed to ban. Error: ${err}`);
    });

    const BanEmbed = new MessageEmbed()
      .setTitle(`${bot.config.bot.Emojis.success} | Ban Command`)
      .setDescription(`${bot.config.bot.Emojis.success} | Successfully Banned <@${UserToBan.id}>(${UserToBan.id})!`)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: "gif" }))
      .addField(`Moderator/Admin: `, `${message.author.tag}`)
      .addField(`Reason: `, ReasonForBan)
      .setFooter(`${bot.config.bot.prefix}Kick to kick a user. • ${bot.config.bot.Embed.Footer}`)
      .setColor(bot.config.bot.Embed.Color)
      .setTimestamp();

    message.reply(BanEmbed);
  } else if (emoji === bot.config.bot.Emojis.error) {
    message.delete();

    message.reply(`${bot.config.bot.Emojis.error} | Ban canceled.`).then(m => m.delete({ timeout: 10000 }));
  }
},

  exports.config = {
    name: `Ban`,
    description: `Is a user bothering you and keep coming back after you kick them? Using this command, they won\'t come back unless they are unbanned.`,
    aliases: [`pban`],
    usage: `<user> <optional reason>`,
    category: `🛠️Moderation🛠️`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`, `MANAGE_MESSAGES`, `BAN_MEMBERS`],
    member_permissions: [`BAN_MEMBERS`],
    enabled: true,
    cooldown: 5
};
