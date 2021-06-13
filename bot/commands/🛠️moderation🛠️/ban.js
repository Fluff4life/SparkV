const { MessageEmbed } = require(`discord.js`);

exports.run = async (Bot, message, Arguments) => {
  const UserToBan = message.mentions.members.first() || message.guild.members.cache.get(Arguments[0]) || message.guild.members.cache.find(User => User.user.username.toLowerCase() === Arguments.slice(0).join(` `) || User.user.username === Arguments[0])
  const ReasonForBan = Arguments.join(` `).slice(22) || `No reason provided.`

  if (!Arguments[0]) {
    return message.lineReply(`${Bot.Config.Bot.Emojis.error} | Please mention someone to ban!`).then(m => m.delete({ timeout: 5000 }))
  }

  if (!UserToBan) {
    return message.lineReply(`${Bot.Config.Bot.Emojis.error} | I cannot find that member!`).then(m => m.delete({ timeout: 5000 }))
  }

  if (UserToBan.id === message.author.id) {
    return message.lineReply(`${Bot.Config.Bot.Emojis.error} | You cannot ban yourself.`).then(m => m.delete({ timeout: 5000 }))
  }

  if (!UserToBan.bannable) {
    return message.lineReply(`${Bot.Config.Bot.Emojis.error} | Uh oh... I can\`t ban this user!`).then(m => m.delete({ timeout: 5000 }))
  }

  const VerificationEmbed = new MessageEmbed()
    .setTitle(`Convermination Prompt`)
    .setDescription(`Are you sure you want to do this?`)
    .setFooter(`Canceling in 60 seconds if no emoji reacted. • ${Bot.Config.Bot.Embed.Footer}`)

  const VerificationMessage = await message.lineReplyNoMention(VerificationEmbed)
  const Emoji = await Bot.PromptMessage(VerificationMessage, message.author, [Bot.Config.Bot.Emojis.success, Bot.Config.Bot.Emojis.error], 60)

  if (Emoji === Bot.Config.Bot.Emojis.error) {
    // Yes
    message.delete()
    UserToBan.send(`${Bot.Config.Bot.Emojis.error} | You have been banned from ${message.guild.name}. Reason: ${ReasonForBan}.`).catch((err) => { })

    UserToBan.ban({
      reason: ReasonForBan
    }).catch((err) => {
      message.lineReplyNoMention(`${Bot.Config.Bot.Emojis.error} | Failed to ban. Error: ${err}`)
    })

    const BanEmbed = new MessageEmbed()
      .setTitle(`${Bot.Config.Bot.Emojis.success} | Ban Command`)
      .setDescription(`${Bot.Config.Bot.Emojis.success} | Successfully Banned <@${UserToBan.id}>(${UserToBan.id})!`)
      .setThumbnail(message.author.displayAvatarURL)
      .addField(`Moderator/Admin: `, `${message.author.tag}`)
      .addField(`Reason: `, ReasonForBan)
      .setFooter(`${Bot.Config.Bot.prefix}Kick to kick a user. • ${Bot.Config.Bot.Embed.Footer}`)
      .setColor(Bot.Config.Bot.Embed.Color)
      .setTimestamp()

    message.lineReplyNoMention(BanEmbed);
  } else if (emoji === Bot.Config.Bot.Emojis.error) {
    message.delete()

    message.lineReplyNoMention(`${Bot.Config.Bot.Emojis.error} | Ban canceled.`).then(m => m.delete({ timeout: 10000 }))
  } 
},

exports.config = {
  name: `Ban`,
  description: `Is a user bothering you and keep coming back after you kick them? Using this command, they won\`t come back unless they are unbanned.`,
  aliases: [`pban`],
  usage: `<user> <optional reason>`,
  category: `🛠️moderation🛠️`,
  bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`, `MANAGE_MESSAGES`, `BAN_MEMBERS`],
  member_permissions: [`BAN_MEMBERS`],
  enabled: true,
  cooldown: 5
}