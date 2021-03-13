const Discord = require("discord.js");

exports.run = async (Bot, msg, Arguments) => {
  const UserToKick = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(Arguments[0]) || `@<${Arguments[0]}>`;
  const ReasonForKick = Arguments.join(" ").slice(22) || "No reason provided."

  if (!Arguments[0]) {
    return msg.channel.send("❌Please mention someone to kick!").then(m => m.delete({ timeout: 5000 }))
  }

  if (!UserToKick) {
    return msg.channel.send("❌I cannot find that member!").then(m => m.delete({ timeout: 5000 }))
  }

  if (UserToKick.id === msg.author.id) {
    return msg.channel.send("❌You cannot kick yourself.").then(m => m.delete({ timeout: 5000 }))
  }

  if (!UserToKick.kickable) {
    return msg.channel.send("❌Uh oh... I can't kick this user!").then(m => m.delete({ timeout: 5000 }))
  }

  const VerificationEmbed = new Discord.MessageEmbed()
    .setTitle("Convermination Prompt")
    .setDescription("Are you sure you want to do this?")
    .setFooter("Canceling in 60 seconds if no emoji reacted.")

  const VerificationMessage = await msg.channel.send(VerificationEmbed)
  const Emoji = await Bot.PromptMessage(VerificationMessage, msg.author, ["✅", "❌"], 60)

  if (Emoji === "✅") {
    // Yes
    msg.delete()

    UserToKick.kick().catch((err) => {
      msg.channel.send(`Failed to kick. Error: ${err}`)
    })

    try {
      UserToKick.send(`You have been kicked from ${msg.guild.name}. Reason: ${ReasonForKick}.`)
    } catch (err) {

    }

    const KickEmbend = new Discord.MessageEmbed()
      .setTitle("Kick Command")
      .setDescription(`*✅Successfully kicked <@${UserToKick.id}>(${UserToKick.id})✅*`)
      .setThumbnail(UserToKick.avatar)
      .addField("Moderator/Admin: ", `${msg.author.tag}`)
      .addField("Reason: ", ReasonForKick)
      .setFooter(`${process.env.prefix}Ban to ban a user.`)
      .setColor(process.env.EmbedColor)
      .setTimestamp();

    msg.channel.send(KickEmbend);
  } else if (emoji === "❌") {
    msg.delete()

    msg.channel.send("❌Kick canceled.").then(m => m.delete({ timeout: 10000 }))
  }
},

  exports.config = {
    name: "Kick",
    description: "Is a user bothering you? Using this command, you can kick them from the server!",
    aliases: [],
    usage: "<user> <optional user>",
    category: "🛠️moderation🛠️",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "MANAGE_MESSAGES", "KICK_MEMBERS"],
    member_permissions: ["KICK_MEMBERS"],
    enabled: true,
    cooldown: 5
  }