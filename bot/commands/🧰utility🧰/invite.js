const Discord = require("discord.js");

exports.run = async (bot, message) => {
  const InvitesEmbend = new Discord.MessageEmbed()
    .setTitle("Invites")
    .setDescription(`The following are links for Ch1llBlox!`)
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: "gif" }))
    .addField("**Support Server**", `[Click Here](${bot.config.bot.support.invite})`, true)
    .addField("bot Invite: ", `[Click Here](https://top.gg/bot/763126208149585961/invite)`, true)
    .setFooter(`Invites for Ch1llBlox • ${bot.config.bot.Embed.Footer}`, bot.user.displayAvatarURL())
    .setColor(bot.config.bot.Embed.Color);
    
  await message.reply(InvitesEmbend);
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