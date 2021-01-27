const Discord = require("discord.js");

exports.run = async (Bot, msg, Arguments) => {
  const UserToKick =
    msg.guild.member(msg.mentions.users.first()) ||
    msg.guild.members.cache.get(Arguments[0]) ||
    `@<${Arguments[0]}>`;
  const ReasonForKick = Arguments.join(" ").slice(22);

  if (!UserToKick) {
    return msg.reply("Please mention someone to kick :)");
  }

  if (!ReasonForKick)
    return msg.reply("You have to tell a reason for the kick :)");

  if (!msg.member.hasPermission("KICK_MEMBERS"))
    return msg.reply("Uh oh... You don't have permision to do that!");

  if (UserToKick) {
    if (ReasonForKick.lenght < 1)
      return msg.reply("Please supply a longer reason for the kick :) ❌");
    if (!msg.guild.member(UserToKick).kickable)
      return msg.reply("Uh oh... I can't kick this person! ❌");

    UserToKick.send(
      `You have been **Kicked** for the reason: ${ReasonForKick}`
    );

    msg.guild.member(UserToKick).kick();
    console.log(
      `New kick: \nTarget: <@${UserToKick.id}> \nAdmin/Moderator: ${msg.author.tag} \nReason: ${ReasonForKick} ✅`
    );

    const KickEmbend = new Discord.MessageEmbed()
      .setTitle("Kick Command")
      .setDescription(
        `*✅Successfully kicked <@${UserToKick.id}>(${UserToKick.id})✅*`
      )
      .setThumbnail(UserToKick.avatar)
      .addField("Moderator/Admin: ", `${msg.author.tag}`)
      .addField("Reason: ", ReasonForKick)
      .setFooter(`${process.env.prefix}Ban to ban a player.`)
      .setColor("#0099ff")
      .setTimestamp();

    msg.channel.send(KickEmbend);
  }
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