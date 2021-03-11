const Discord = require("discord.js");

exports.run = async (Bot, msg) => {
  const InvitesEmbend = new Discord.MessageEmbed()
    .setTitle("Invites")
    .setDescription(`The following are important links for Ch1llBlox!`)
    .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
    .addField("Support Server: ", process.env.support_server_invite, true)
    .addField("Bot Invite: ", "https://top.gg/bot/763126208149585961", true)
    .setFooter(`Try command ${process.env.prefix}Meme!`, Bot.user.displayAvatarURL())
    .setColor("#0099ff");
    
  await msg.channel.send(InvitesEmbend);
},

exports.config = {
  name: "Invite",
  description: "Get an invite for me or to the support server.",
  aliases: ["invite", "support"],
  usage: "",
  category: "🧰utility🧰",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 1.5
}