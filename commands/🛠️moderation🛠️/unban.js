const Discord = require("discord.js");

exports.run = async (Bot, msg, Arguments) => {
  const UserToUnban = await Bot.users.fetch(Arguments[0])
  const Reason = Arguments[1] || "No reason provided."

  if (!UserToUnban){
    return msg.channel.send("Please mention someone to unban!");
  }

  if (!msg.member.hasPermission("KICK_MEMBERS")){
    return msg.channel.send("Uh oh... You don't have permision to do that!")
  }
  
  UserToUnban.send(`You have been **unbaned** for the reason: ${UserToUnban}.`).catch(() => {})
  msg.guild.members.unban(UserToUnban, Reason)
  
    console.log(`New unban: \nTarget: <@${UserToUnban.id}> \nAdmin/Moderator: ${msg.author.tag} \nReason: ${UserToUnban} ✅`);

    const KickEmbend = new Discord.MessageEmbed()
      .setTitle("Unban Command")
      .setDescription(`*✅Successfully unbanned {UserToUnban}✅*`)
      .setThumbnail(UserToUnban.avatar)
      .addField("Moderator/Admin: ", `${msg.author.tag}`)
      .addField("Reason: ", Reason)
      .setFooter(`${process.env.prefix}Ban to ban a player.`)
      .setColor("#0099ff")
      .setTimestamp();

    msg.channel.send(KickEmbend);
},
  
  exports.config = {
    enabled: true,
    guild_only: true,
    aliases: ["ub"],
    mod_only: false
  },
  
  exports.help = {
    name: "Unban",
    description:
      "Banned someone but want to unban them? Easy!",
    usage: "[user]",
    category: "🛠️moderation🛠️",
    cooldown: 5
  }