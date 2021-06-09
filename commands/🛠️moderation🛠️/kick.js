const Discord = require(`discord.js`);

exports.run = async (Bot, message, Arguments) => {
  const UserToKick = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(Arguments[0]) || `@<${Arguments[0]}>`;
  const ReasonForKick = Arguments.join(` `).slice(22) || `No reason provided.`

  if (!Arguments[0]) {
    return message.lineReply(`${Bot.Config.Bot.Emojis.error} | Please mention someone to kick!`).then(m => m.delete({ timeout: 5000 }))
  }

  if (!UserToKick) {
    return message.lineReply(`${Bot.Config.Bot.Emojis.error} | I cannot find that member!`).then(m => m.delete({ timeout: 5000 }))
  }

  if (UserToKick.id === message.author.id) {
    return message.lineReply(`${Bot.Config.Bot.Emojis.error} | You cannot kick yourself.`).then(m => m.delete({ timeout: 5000 }))
  }

  if (!UserToKick.kickable) {
    return message.lineReply(`${Bot.Config.Bot.Emojis.error} | Uh oh... I can't kick this user!`).then(m => m.delete({ timeout: 5000 }))
  }

  const VerificationEmbed = new Discord.MessageEmbed()
    .setTitle(`Convermination Prompt`)
    .setDescription(`Are you sure you want to do this?`)
    .setFooter(`Canceling in 60 seconds if no emoji reacted. • ${Bot.Config.Bot.Embed.Footer}`)

  const VerificationMessage = await message.lineReplyNoMention(VerificationEmbed)
  const Emoji = await Bot.PromptMessage(VerificationMessage, message.author, [Bot.Config.Bot.Emojis.success, Bot.Config.Bot.Emojis.error], 60)

  if (Emoji === Bot.Config.Bot.Emojis.success) {
    // Yes
    message.delete()

    UserToKick.kick().catch((err) => {
      message.lineReplyNoMention(`${Bot.Config.Bot.Emojis.error} | Failed to kick. Error: ${err}`)
    })

    try {
      UserToKick.send(`${Bot.Config.Bot.Emojis.error} | You have been kicked from ${message.guild.name}. Reason: ${ReasonForKick}.`)
    } catch (err) {

    }

    const KickEmbend = new Discord.MessageEmbed()
      .setTitle(`Kick Command`)
      .setDescription(`${Bot.Config.Bot.Emojis.success} | Successfully kicked <@${UserToKick.id}>(${UserToKick.id})!`)
      .setThumbnail(UserToKick.avatar)
      .addField(`Moderator/Admin: `, `${message.author.tag}`)
      .addField(`Reason: `, ReasonForKick)
      .setFooter(`${Bot.Config.Bot.prefix}Ban to ban a user. • ${Bot.Config.Bot.Embed.Footer}`)
      .setColor(Bot.Config.Bot.Embed.Color)
      .setTimestamp();

    message.lineReplyNoMention(KickEmbend);
  } else if (emoji === Bot.Config.Bot.Emojis.error) {
    message.delete()

    message.lineReplyNoMention(`${Bot.Config.Bot.Emojis.error} | Kick canceled.`).then(m => m.delete({ timeout: 10000 }))
  }
},

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
  }