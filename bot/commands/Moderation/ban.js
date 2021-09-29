const { MessageEmbed, Permissions } = require("discord.js");

const cmd = require("../../templates/modCommand");

async function execute(bot, message, args, command, data) {
  const UserToBan = bot.functions.GetMember(message, args);
  const ReasonForBan = args.join(` `).slice(22) || `No reason provided.`;

  if (!args[0]) {
    return message
      .reply(`${bot.config.Emojis.error} | Please mention someone to ban!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (!UserToBan) {
    return message
      .reply(`${bot.config.Emojis.error} | I cannot find that member!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (UserToBan.id === message.author.id) {
    return message
      .reply(`${bot.config.Emojis.error} | You cannot ban yourself.`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (!UserToBan.bannable) {
    return message
      .reply(`${bot.config.Emojis.error} | Uh oh... I can\`t ban this user!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  message.delete().catch(err => {});
  UserToBan.send(
    `${bot.config.Emojis.error} | You have been banned from ${message.guild.name}. Reason: ${ReasonForBan}.`,
  ).catch(err => {});

  UserToBan.ban({
    reason: ReasonForBan,
  }).catch(err => {
    message.reply(`${bot.config.Emojis.error} | Failed to ban. Error: ${err}`);
  });

  const BanEmbed = new MessageEmbed()
    .setTitle(`${bot.config.Emojis.success} | Ban Command`)
    .setDescription(`${bot.config.Emojis.success} | Successfully Banned <@${UserToBan.id}>(${UserToBan.id})!`)
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: "gif" }))
    .addField(`Moderator/Admin: `, `${message.author.tag}`)
    .addField(`Reason: `, ReasonForBan)
    .setFooter(`${bot.config.prefix}Kick to kick a user. • ${bot.config.embed.footer}`)
    .setColor(bot.config.embed.color)
    .setTimestamp();

  message.reply({
    embeds: [BanEmbed]
  });
}

module.exports = new cmd(execute, {
  description: `Is a user bothering you and keep coming back after you kick them? Using this command, they won\'t come back unless they are unbanned.`,
  dirname: __dirname,
  usage: `<user> <optional reason>`,
  aliases: [`pban`],
  perms: ["BAN_MEMBERS"],
});
