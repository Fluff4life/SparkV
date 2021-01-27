const Discord = require("discord.js");

exports.run = async (Bot, msg, Arguments) => {
  const UserToBan =
    msg.guild.member(msg.mentions.users.first()) ||
    msg.guild.members.cache.get(Arguments[0]) ||
    `@<${Arguments[0]}>`;
  const ReasonForBan = Arguments.join(" ").slice(22);

  if (!UserToBan) {
    return msg.reply("Please mention someone to ban :)");
  }

  if (!ReasonForBan)
    return msg.reply("You have to tell a reason for the ban :)");

  if (!msg.member.hasPermission("BAN_MEMBERS"))
    return msg.reply("Uh oh... You don't have permision to do that!");

  if (UserToBan) {
    if (ReasonForBan.length < 1)
      return msg.reply("You have to tell a reason for the ban :)");
    if (!msg.guild.member(UserToBan).bannable)
      return msg.reply("Uh oh... I can't ban this user!");

    UserToBan.send(
      `You have been banned due to the following reason: ${ReasonForBan}.`
    );

    msg.guild.member(UserToBan).ban({
      reason: ReasonForBan
    });

    console.log(
      `New ban: \nTarget: <@${UserToBan.tag}> \nAdmin/Moderator: ${msg.author.tag} \nReason: ${ReasonForBan}`
    );

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
},
  
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