const { MessageEmbed } = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const UserToBan = message.mentions.members.first() || message.guild.members.cache.get(Arguments[0]) || message.guild.members.cache.find(User => User.user.username.toLowerCase() === Arguments.slice(0).join(" ") || User.user.username === Arguments[0])
  const ReasonForBan = Arguments.join(" ").slice(22) || "No reason provided."

  if (!Arguments[0]) {
    return message.channel.send("❌Please mention someone to ban!").then(m => m.delete({ timeout: 5000 }))
  }

  if (!UserToBan) {
    return message.channel.send("❌I cannot find that member!").then(m => m.delete({ timeout: 5000 }))
  }

  if (UserToBan.id === message.author.id) {
    return message.channel.send("❌You cannot ban yourself.").then(m => m.delete({ timeout: 5000 }))
  }

  if (!UserToBan.bannable) {
    return message.channel.send("❌Uh oh... I can't ban this user!").then(m => m.delete({ timeout: 5000 }))
  }

  const VerificationEmbed = new MessageEmbed()
    .setTitle("Convermination Prompt")
    .setDescription("Are you sure you want to do this?")
    .setFooter("Canceling in 60 seconds if no emoji reacted.")

  const VerificationMessage = await message.channel.send(VerificationEmbed)
  const Emoji = await Bot.PromptMessage(VerificationMessage, message.author, ["✅", "❌"], 60)

  if (Emoji === "✅") {
    // Yes
    message.delete()

    try {
      UserToBan.send(`You have been banned from ${message.guild.name}. Reason: ${ReasonForBan}.`)
    } catch (err) {
      
    }

    

    UserToBan.ban({
      reason: ReasonForBan
    }).catch((err) => {
      message.channel.send(`Failed to ban. Error: ${err}`)
    })

    const BanEmbed = new MessageEmbed()
      .setTitle("Ban Command")
      .setDescription(`*✅Successfully Banned <@${UserToBan.id}>(${UserToBan.id})✅*`)
      .setThumbnail(message.author.displayAvatarURL)
      .addField("Moderator/Admin: ", `${message.author.tag}`)
      .addField("Reason: ", ReasonForBan)
      .setFooter(`${Bot.Config.Bot.prefix}Kick to kick a user.`)
      .setColor(Bot.Config.Embed.EmbedColor)
      .setTimestamp()

    message.channel.send(BanEmbed);
  } else if (emoji === "❌") {
    message.delete()

    message.channel.send("❌Ban canceled.").then(m => m.delete({ timeout: 10000 }))
  } 
},

exports.config = {
  name: "Ban",
  description: "Is a user bothering you and keep coming back after you kick them? Using this command, they won't come back unless they are unbanned.",
  aliases: ["pban"],
  usage: "<user> <optional reason>",
  category: "🛠️moderation🛠️",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "MANAGE_MESSAGES", "BAN_MEMBERS"],
  member_permissions: ["BAN_MEMBERS"],
  enabled: true,
  cooldown: 5
}