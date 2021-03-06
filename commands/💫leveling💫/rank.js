const Discord = require("discord.js");
const Levels = require("discord-xp")

exports.run = async (Bot, message, Arguments) => {
  const Leveling = await Bot.Database.get(`ServerData_${message.guild.id}.Leveling`)

  if (!Leveling || !Leveling === "on") {
    return message.channel.send("Leveling is not enabled for this server. Please enable it by doing `(prefix)Leveling on`!")
  }

  const Target = message.author
  const User = await Levels.fetch(Target.id, message.guild.id)
  const NeededXP = Levels.xpFor(parseInt(User.level) + 1)

  const canvacord = require("canvacord");

  var Rank

  if (!User) {
    Rank = new canvacord.Rank()
      .setUsername(Target.username)
      .setDiscriminator(Target.discriminator)
      .setAvatar(Target.displayAvatarURL({ dynamic: false, format: "png" }))
      .setLevel(1)
      .setCurrentXP(0)
      .setRequiredXP(100)
      .setProgressBar("#0099ff", "COLOR")
  } else {
    Rank = new canvacord.Rank()
      .setUsername(Target.username)
      .setDiscriminator(Target.discriminator)
      .setAvatar(Target.displayAvatarURL({ dynamic: false, format: "png" }))
      .setLevel(Bot.FormatNumber(User.level))
      .setCurrentXP(Bot.FormatNumber(User.xp))
      .setRequiredXP(Bot.FormatNumber(NeededXP))
      .setProgressBar("#0099ff", "COLOR")
  }

  Rank.build().then(data => {
    const Attachment = new Discord.MessageAttachment(data, `${Target.tag}RankCard.png`)

    message.channel.send(Attachment)
  })
},

  exports.config = {
    name: "Rank",
    description: "View your rank!",
    aliases: [],
    usage: "",
    category: "💫leveling💫",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    member_permissions: [],
    enabled: true,
    cooldown: 2.5
  }