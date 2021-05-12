const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const User = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(Arguments[0]) || `@<${Arguments[0]}>`;
  const Reason = Arguments.join(" ").slice(22) || "No reason provided."

  if (!Arguments[0]) {
    return message.lineReplyNoMention("❌Please mention someone to mute!").then(m => m.delete({ timeout: 5000 }))
  }

  if (!User) {
    return message.lineReplyNoMention("❌I cannot find that member!").then(m => m.delete({ timeout: 5000 }))
  }

  if (User.id === message.author.id) {
    return message.lineReplyNoMention("❌You cannot mute yourself.").then(m => m.delete({ timeout: 5000 }))
  }

  if (!User.kickable) {
    return message.lineReplyNoMention("❌Uh oh... I can't mute this user!").then(m => m.delete({ timeout: 5000 }))
  }

  if (User.user.bot) {
    return message.lineReplyNoMention("I cannot mute bots!")
  }

  const Roles = User.roles.cache.filter(role => role.id !== message.guild.id).map(role => role.id)
  var MutedRole = message.guild.roles.cache.find(role => role.name.toLowerCase().includes("muted"))

  if (!MutedRole) {
    if (!message.guild || !message.guild.roles){
      return message.lineReply("Uh oh! An error occured. Make sure I have the correct permisions.")
    }

    MutedRole = await message.guild.roles.create({
      data: {
        name: "Muted",
        color: "#514f48",
        permissions: []
      }
    })

    message.guild.channels.cache.forEach(async (channel) => {
      await channel.createOverwrite(MutedRole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: true,
        SPEAK: false,
        CONNECT: true
      })
    })
  }

  if (User.roles.cache.has(MutedRole.id)) {
    return message.lineReplyNoMention("This user is already muted!")
  }

  const VerificationEmbed = new Discord.MessageEmbed()
    .setTitle("Convermination Prompt")
    .setDescription("Are you sure you want to do this?")
    .setFooter(`Canceling in 60 seconds if no emoji reacted. • ${Bot.Config.Embed.EmbedFooter}`)

  const VerificationMessage = await message.lineReplyNoMention(VerificationEmbed)
  const Emoji = await Bot.PromptMessage(VerificationMessage, message.author, ["✅", "❌"], 60)

  if (Emoji === "✅") {
    // Yes
    message.delete()

    User.roles.add(MutedRole)
    User.send(`You have been muted in ${message.guild.name}. Reason: ${Reason}.`).catch((err) => { })

    const MuteEmbend = new Discord.MessageEmbed()
      .setTitle("Mute Command")
      .setDescription(`*✅Successfully Muted <@${User.id}>(${User.id})✅*`)
      .setThumbnail(User.avatar)
      .addField("Moderator/Admin: ", `${message.author.tag}`)
      .addField("Reason: ", Reason)
      .setFooter(`${Bot.Config.Bot.prefix}Unmute to unmute a user. • ${Bot.Config.Embed.EmbedFooter}`)
      .setColor(Bot.Config.Embed.EmbedColor)
      .setTimestamp();

    message.lineReplyNoMention(MuteEmbend);
  } else if (emoji === "❌") {
    message.delete()

    message.lineReplyNoMention("Mute canceled.").then(m => m.delete({ timeout: 10000 }))
  }
},

  exports.config = {
    name: "Mute",
    description: "I'll mute someone.",
    aliases: [],
    usage: "<user> <reason>",
    category: "🛠️moderation🛠️",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "MANAGE_CHANNELS", "MANAGE_ROLES"],
    member_permissions: ["MANAGE_ROLES"],
    enabled: true,
    cooldown: 5
  }