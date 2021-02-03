const Discord = require("discord.js");

exports.run = async (Bot, msg, Arguments) => {
  const UserToKick = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(Arguments[0]) || `@<${Arguments[0]}>`;
  const ReasonForKick = Arguments.join(" ").slice(22) || "No reason provided."

  if (!UserToKick){
    return msg.channel.send("Please mention someone to kick :)").then(m => m.delete({ timeout: 5000 }))
  }

  if (!msg.member.hasPermission("KICK_MEMBERS")){
    return msg.channel.send("Uh oh... You don't have permision to do that!").then(m => m.delete({ timeout: 5000 }))
  }

  if (!msg.guild.member(UserToKick).kickable){
    return msg.channel.send("Uh oh... I can't kick this person! ❌").then(m => m.delete({ timeout: 5000 }))
  }

  UserToKick.send(`You have been **Kicked** for the reason: ${ReasonForKick}`)

  msg.guild.member(UserToKick).kick();
  console.log(`New kick: \nTarget: <@${UserToKick.id}> \nAdmin/Moderator: ${msg.author.tag} \nReason: ${ReasonForKick} ✅`)

    const KickEmbend = new Discord.MessageEmbed()
      .setTitle("Kick Command")
      .setDescription(`*✅Successfully kicked <@${UserToKick.id}>(${UserToKick.id})✅*`)
      .setThumbnail(UserToKick.avatar)
      .addField("Moderator/Admin: ", `${msg.author.tag}`)
      .addField("Reason: ", ReasonForKick)
      .setFooter(`${process.env.prefix}Ban to ban a player.`)
      .setColor("#0099ff")
      .setTimestamp();

    msg.channel.send(KickEmbend);
},
  
  exports.config = {
    enabled: true,
    guild_only: true,
    aliases: ["k"],
    mod_only: false
  },
  
  exports.help = {
    name: "Kick",
    description:
      "Is a user bothering you? Using this command, you can kick them from the server!",
    usage: "[user] [reason]",
    category: "🛠️moderation🛠️",
    cooldown: 5
  }