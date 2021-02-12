const { MessageEmbed } = require("discord.js");

exports.run = async (Bot, msg, Arguments) => {
  const UserToBan = msg.mentions.members.first() || msg.guild.members.cache.get(Arguments[0]) || msg.guild.members.cache.find(User => User.user.username.toLowerCase() === Arguments.slice(0).join(" ") || User.user.username === Arguments[0])
  const ReasonForBan = Arguments.join(" ").slice(22) || "No reason provided."

  if (!message.guild.me.hasPermission("BAN_MEMBERS")){
    return msg.channel.send("❌I don't have permision to do that! Please select my role and allow BAN_MEMBERS.").then(m => m.delete({ timeout: 5000 }))
  }

  if (!msg.member.hasPermission("BAN_MEMBERS")){
    return msg.channel.send("❌You don't have permision to do that!").then(m => m.delete({ timeout: 5000 }))
  }

  if (!Arguments[0]){
    return msg.channel.send("❌Please mention someone to ban!").then(m => m.delete({ timeout: 5000 }))
  }

  if (!UserToBan){
    return msg.channel.send("❌I cannot find that member!").then(m => m.delete({ timeout: 5000 }))
  }

  if (UserToBan.id === message.author.id){
    return msg.channel.send("❌You cannot ban yourself.").then(m => m.delete({ timeout: 5000 }))
  }

  if (!UserToBan.bannable){
      return msg.channel.send("❌Uh oh... I can't ban this user!").then(m => m.delete({ timeout: 5000 }))
  }

  const VerificationEmbed = new MessageEmbed()
  .setTitle("Convermination Prompt")
  .setDescription("Are you sure you want to do this?")
  .setFooter("Canceling in 60 seconds if no emoji reacted.")

  await message.channel.send(VerificationEmbed).then(async msg => {
    const Emoji = await Bot.PromptMessage(msg, message.author, ["✅", "❌"], 60)

    if (Emoji === "✅"){
      // Yes
      msg.delete()

      UserToBan.send(`You have been banned from ${guild.name}. Reason: ${ReasonForBan}.`).catch((err) => {
        message.channel.send(`Failed to ban. Error: ${err}`)
      })

      UserToBan.ban({
        reason: ReasonForBan
      })

      const BanEmbed = new MessageEmbed()
      .setTitle("Ban Command")
      .setDescription(`*✅Successfully Banned <@${UserToBan.id}>(${UserToBan.id})✅*`)
      .setThumbnail(message.author.displayAvatarURL)
      .addField("Moderator/Admin: ", `${msg.author.tag}`)
      .addField("Reason: ", ReasonForBan)
      .setFooter(`${process.env.prefix}Kick to kick a player.`)
      .setColor("#0099ff")
      .setTimestamp()

    msg.channel.send(BanEmbed);
    } else if (emoji === "❌"){
      msg.delete()

      message.channel.send("❌Ban canceled.").then(m => m.delete({ timeout: 10000 }))
    }
  })  
},
  
  exports.config = {
    enabled: true,
    guild_only: true,
    aliases: ["pban", "b"],
    mod_only: false
  },
    
  exports.help = {
    name: "Ban",
    description: "Is a user bothering you and keep coming back after you kick them? Using this command, they won't come back unless they are unbanned.",
    usage: "[user] [optional reason]",
    category: "🛠️moderation🛠️",
    cooldown: 5
  }