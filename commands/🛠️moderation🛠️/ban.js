const Discord = require("discord.js");

exports.run = async (Bot, msg, Arguments) => {
  const UserToBan = msg.mentions.members.first() || msg.guild.members.cache.get(Arguments[0]) || msg.guild.members.cache.find(User => User.user.username.toLowerCase() === Arguments.slice(0).join(" ") || User.user.username === Arguments[0])
  const ReasonForBan = Arguments.join(" ").slice(22) || "No reason provided."

  if (!UserToBan) {
    return msg.channel.send("Please mention someone to ban!").then(m => m.delete({ timeout: 5000 }))
  }

  if (!msg.member.hasPermission("BAN_MEMBERS")){
    return msg.channel.send("You don't have permision to do that!").then(m => m.delete({ timeout: 5000 }))
  }

    if (!UserToBan.bannable){
      return msg.channel.send("Uh oh... I can't ban this user!").then(m => m.delete({ timeout: 5000 }))
    }

    UserToBan.send(`You have been banned due to the following reason: ${ReasonForBan}.`).catch(() => {})

    UserToBan.ban({
      reason: ReasonForBan
    })

    console.log(`New ban: \nTarget: <@${UserToBan.tag}> \nAdmin/Moderator: ${msg.author.tag} \nReason: ${ReasonForBan}`)

    const BanEmbed = new Discord.MessageEmbed()
      .setTitle("Ban Command")
      .setDescription(
        `*✅Successfully Banned <@${UserToBan.id}>(${UserToBan.id})✅*`
      )
      .setThumbnail(UserToBan.avatar)
      .addField("Moderator/Admin: ", `${msg.author.tag}`)
      .addField("Reason: ", ReasonForBan)
      .setFooter(`${process.env.prefix}Ban to ban a player.`)
      .setColor("#0099ff")
      .setTimestamp();

    msg.channel.send(BanEmbed);
  }
  
  exports.config = {
    enabled: true,
    guild_only: true,
    aliases: ["pban", "b"],
    mod_only: false
  },
    
  exports.help = {
    name: "Ban",
    description:
      "Is a user bothering you and keep coming back after you kick them? Using this command, they won't come back unless they are unbanned.",
    usage: "[user] [reason]",
    category: "🛠️moderation🛠️",
    cooldown: 5
  }