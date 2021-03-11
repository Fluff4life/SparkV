const Discord = require("discord.js");

exports.run = async (Bot, msg) => {
  const InvitesEmbend = new Discord.MessageEmbed()
    .setTitle("Invites")
    .setDescription(`The following are links for Ch1llBlox!`)
    .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
    .addField("**Support Server**", `[Click Here](${process.env.support_server_invite})`, true)
    .addField("Bot Invite: ", `[Click Here](https://ch1ll.herokuapp.com/ch1llblox/invite)`, true)
    .setFooter(`Invites for Ch1llBlox.`, Bot.user.AvatarURL)
    .setColor(process.env.EmbedColor);
    
  await msg.channel.send(InvitesEmbend);
},

exports.config = {
  name: "Invite",
  description: "Displays links.",
  aliases: ["invite", "support"],
  usage: "",
  category: "🧰utility🧰",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 1.5
}