const Discord = require("discord.js");
const Levels = require("discord-xp")

exports.run = async (Bot, message, Arguments) => {
  const Target = message.mentions.users.first() || message.author
  const User = await Levels.fetch(Target.id, message.guild.id)
  const NeededXP = Levels.xpFor(parseInt(User.level) + 1)

  const canvacord = require("canvacord");

  if (!User) {
    return message.reply("this user has not earned any levels/xp yet. Check back later!")
  }

  const Rank = new canvacord.Rank()
    .setUsername(User.name)
    .setDiscriminator(Target.tag)
    .setAvatar(Target.displayAvatarURL({ dynamic: true, format: "png" }))
    .setLevel(User.level)
    .setCurrentXP(User.xp)
    .setRequiredXP(NeededXP)
    .setStatus(User.presence.status)
    .setProgressBar("#0099ff", "COLOR")

  Rank.build().then(data => {
    const Attachment = new Discord.MessageAttachment(data, `${Target.tag}RankCard.png`)

    message.channel.send(Attachment)
  })
},

  exports.config = {
    name: "Rank",
    description: "View your ",
    aliases: [],
    usage: "<on or off>",
    category: "⚙config⚙",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    member_permissions: ["ADMINISTRATOR"],
    enabled: true,
    cooldown: 2.5
  }