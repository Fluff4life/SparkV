const { MessageEmbed } = require("discord.js");

exports.run = async (Bot, msg, Arguments) => {
  const UserToBan = msg.mentions.members.first() || msg.guild.members.cache.get(Arguments[0]) || msg.guild.members.cache.find(User => User.user.username.toLowerCase() === Arguments.slice(0).join(" ") || User.user.username === Arguments[0])
  const ReasonForBan = Arguments.join(" ").slice(22) || "No reason provided."

  if (!Arguments[0]) {
    return msg.channel.send("❌Please mention someone to ban!").then(m => m.delete({ timeout: 5000 }))
  }

  if (!UserToBan) {
    return msg.channel.send("❌I cannot find that member!").then(m => m.delete({ timeout: 5000 }))
  }

  if (UserToBan.id === msg.author.id) {
    return msg.channel.send("❌You cannot ban yourself.").then(m => m.delete({ timeout: 5000 }))
  }

  if (!UserToBan.bannable) {
    return msg.channel.send("❌Uh oh... I can't ban this user!").then(m => m.delete({ timeout: 5000 }))
  }

  const VerificationEmbed = new MessageEmbed()
    .setTitle("Convermination Prompt")
    .setDescription("Are you sure you want to do this?")
    .setFooter("Canceling in 60 seconds if no emoji reacted.")

  const VerificationMessage = await msg.channel.send(VerificationEmbed)
  const Emoji = await Bot.PromptMessage(VerificationMessage, msg.author, ["✅", "❌"], 60)

  if (Emoji === "✅") {
    // Yes
    msg.delete()

    UserToBan.send(`You have been banned from ${msg.guild.name}. Reason: ${ReasonForBan}.`).catch((err) => {
      msg.channel.send(`Failed to ban. Error: ${err}`)
    })

    UserToBan.ban({
      reason: ReasonForBan
    })

    const BanEmbed = new MessageEmbed()
      .setTitle("Ban Command")
      .setDescription(`*✅Successfully Banned <@${UserToBan.id}>(${UserToBan.id})✅*`)
      .setThumbnail(msg.author.displayAvatarURL)
      .addField("Moderator/Admin: ", `${msg.author.tag}`)
      .addField("Reason: ", ReasonForBan)
      .setFooter(`${process.env.prefix}Kick to kick a player.`)
      .setColor(process.env.EmbedColor)
      .setTimestamp()

    msg.channel.send(BanEmbed);
  } else if (emoji === "❌") {
    msg.delete()

    msg.channel.send("❌Ban canceled.").then(m => m.delete({ timeout: 10000 }))
  } 
},

exports.config = {
  name: "ban",
  description: "Is a user bothering you and keep coming back after you kick them? Using this command, they won't come back unless they are unbanned.",
  aliases: ["pban"],
  usage: "<user> <optional reason>",
  category: "🛠️moderation🛠️",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "MANAGE_MESSAGES", "BAN_MEMBERS"],
  member_permissions: ["BAN_MEMBERS"],
  enabled: true,
  cooldown: 5
}